import commandLine from "../CommandLineInterface/CommandLineInterface";

import Day from "./Day";

export type TEvent = {
  name: string;
  description: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  milisecond: number;
};

export default class Event extends Day {
  private name: string;
  private description: string;

  constructor (
    name: string,
    description: string,
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    milisecond?: number) {
      super(year, month, day, hour, minute, second, milisecond);
      this.name = name;
      this.description = description;
  }

  public showEvent = (): void => {
    const eventString = `${this.name} - ${this.year}.${this.month}.${this.day}`;

    commandLine.output(eventString);
  }

  public showFullEvent = (): void => {
    commandLine.output(this.name);
    commandLine.output(`${this.year}.${this.month}.${this.day} ${this.hour}:${this.minute}:${this.second}`);
    commandLine.output(this.description);
  }

  public getEventData = (): TEvent => ({
    name: this.name,
    description: this.description,
    year: this.year,
    month: this.month,
    day: this.day,
    hour: this.hour,
    minute: this.minute,
    second: this.second,
    milisecond: this.milisecond,
  });
}
