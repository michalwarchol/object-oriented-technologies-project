import path from 'path';

import FileManager from "../FileManager/FileManager";
import Event, { TEvent } from '../Day/Event';
import Format from '../Day/Format';
import DateValidator from '../Validators/DateValidator';
import commandLine from '../CommandLineInterface/CommandLineInterface';
import Config from '../Config';

import messages from './EventManager.messages';

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

  private getDate = () => new Promise<string>((resolve) => {
    commandLine.input(messages.enterDate, (response) => {
      const validator = new DateValidator({ isDateFormat: true });
      if (!validator.validate(response)) {
        this.getDate().then(resolve);
      } else {
        resolve(response);
      }
    });
  });

  public createEvent = async (): Promise<boolean> => {
    const name = await new Promise<string>((resolve) => {
      commandLine.input(messages.enterName, (response) => {
        resolve(response);
      });
    });
    
    const description = await new Promise<string>((resolve) => {
      commandLine.input(messages.enterDescription, (response) => {
        resolve(response);
      });
    });

    const dateInput = await this.getDate();

    const { year, month, day, hour, minute, second } = Format.getDateValues(dateInput);

    return this.saveEvent(new Event(name, description, year, month, day, hour, minute, second));
  }

  private getCloseEvents = async (): Promise<TEvent[]> => {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    const data = await this.readFile<TEvent[]>(Config.eventsDir + '/' + this.file);

    if (data === null) {
      return [];
    }

    return data.filter((e) => {
      const event = new Event(e.name, e.description, e.year, e.month, e.day);
      const date = new Date(event.getDateString(Format.date));
      const dateTime = date.getTime();

      const nowTime = now.getTime();
      const oneWeekLaterTime = oneWeekLater.getTime();

      return dateTime >= nowTime && dateTime <= oneWeekLaterTime;
    })
  } 

  public showCloseEvents = async (): Promise<void> => {
    const events = await this.getCloseEvents();

    if(events.length === 0) {
      commandLine.output(messages.noData);
    }

    events.forEach((eventData) => {
      const event = new Event(eventData.name, eventData.description, eventData.year, eventData.month, eventData.day);
      event.showEvent();
    });
  }
}
