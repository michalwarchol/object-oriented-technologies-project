import path from 'path';

import FileManager from "../FileManager/FileManager";
import Event, { TEvent } from '../Day/Event';
import Format from '../Day/Format';
import DateValidator from '../Validators/DateValidator';
import commandLine from '../CommandLineInterface/CommandLineInterface';
import Config from '../Config';

export default class EventManager extends FileManager {
  private file: string;
  constructor (dir: string, file: string) {
    super(dir);
    this.file = file;
  }

  public init = async (): Promise<void> => {
    await this.mkdir(path.join(Config.eventsDir));
  }
  
  private saveEvent = async (event: Event): Promise<boolean> => {
    const data = await this.readFile<TEvent[]>(Config.eventsDir + '/' + this.file);
    
    if (data === null) {
      return false;
    }

    const eventData = event.getEventData();
    data.push(eventData);
    
    this.writeFile(Config.eventsDir + '/' + this.file, data);
    
    return true;
  }

  private getDate = async (): Promise<string> => {
    const response  = await commandLine.input('Date (yyyy-mm-dd hh:mm:ss): ');

    const validator = new DateValidator({ isDateFormat: true });
      if (!validator.validate(response)) {
        const res = await this.getDate();

        return res;
      } else {
        return response;
      }
    };

  public createEvent = async (): Promise<boolean> => {
    const name = await commandLine.input('Enter event name: ');
    const description = await commandLine.input('Enter event description: ');
    const dateInput = await this.getDate();

    const { year, month, day, hour, minute, second } = Format.getDateValues(dateInput);

    return this.saveEvent(new Event(name, description, year, month, day, hour, minute, second));
  }

  private getAllEvents = async (): Promise<TEvent[]> => {
    const data = await this.readFile<TEvent[]>(Config.eventsDir + '/' + this.file);

    if (data === null) {
      return [];
    }

    return data;
  }

  private getCloseEvents = async (): Promise<TEvent[]> => {
    const data = await this.readFile<TEvent[]>(Config.eventsDir + '/' + this.file);

    if (data === null) {
      return [];
    }

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    return data.filter((e) => {
      const event = new Event(e.name, e.description, e.year, e.month, e.day);
      const date = new Date(event.getDateString(Format.date));
      const dateTime = date.getTime();

      const nowTime = now.getTime();
      const oneWeekLaterTime = oneWeekLater.getTime();

      console.log(nowTime);
      console.log(dateTime);
      console.log(oneWeekLaterTime);

      return dateTime >= nowTime && dateTime <= oneWeekLaterTime;
    })
  } 

  public showCloseEvents = async (): Promise<void> => {
    const events = await this.getCloseEvents();

    if(events.length === 0) {
      commandLine.output('No events found!');
    }

    events.forEach((eventData) => {
      const event = new Event(eventData.name, eventData.description, eventData.year, eventData.month, eventData.day);
      event.showEvent();
    });
  }

  public editEvent = async (): Promise<void> => {
    const events = await this.getAllEvents();

    events.forEach((event, i) => {
      commandLine.output(`${i + 1}. ${event.name}`);
    });

    const response = await commandLine.input('Choose event to edit: ');    
    const index = parseInt(response) - 1;
    const event = events[index];

    if (!event) {
      commandLine.output('Event not found!');
    } else {
      commandLine.output(`You have chosen ${event.name}\n`);

      const name = await commandLine.input('Enter event name: ');
      const description = await commandLine.input('Enter event description: ');
      const dateInput = await this.getDate();

      const { year, month, day, hour, minute, second } = Format.getDateValues(dateInput);

      const newEvent = new Event(name, description, year, month, day, hour, minute, second);
      const newEventData = newEvent.getEventData();

      events[index] = newEventData;

      this.writeFile(Config.eventsDir + '/' + this.file, events);

      commandLine.output(`Event has been edited successfully!`);
    }
  }

  public deleteEvent = async (): Promise<boolean> => {
    const events = await this.getAllEvents();

    events.forEach((event, i) => {
      commandLine.output(`${i + 1}. ${event.name}`);
    });

    const response = await commandLine.input('Choose event to delete: ');    
    const index = parseInt(response) - 1;
    const event = events[index];

    if (!event) {
      commandLine.output('Event not found!');

      return false;
    } else {
      events.splice(index, 1);
      this.writeFile(Config.eventsDir + '/' + this.file, events);

      commandLine.output(`Event has been deleted successfully!`);

      return true;
    }
  }
}
