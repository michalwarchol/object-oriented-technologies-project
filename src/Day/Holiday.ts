import Day from './Day';
import Format from './Format';

class Holiday extends Day {
  name: string;

  constructor(
    name: string,
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth(),
    day: number = new Date().getDate(),
    hour: number = new Date().getHours(),
    minute: number = new Date().getMinutes(),
    second: number = new Date().getSeconds(),
    milisecond: number = new Date().getMilliseconds()
  ) {
    super(year, month, day, hour, minute, second, milisecond);
    this.name = name;
  }

  public getHolidayDate = () => {
    return `(${this.name}) -> ${this.getDateString(Format.date)}`
  }
}

export default Holiday;
