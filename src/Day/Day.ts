import Format from './Format';

class Day {
  protected year: number;
  protected month: number;
  protected day: number;
  protected hour: number;
  protected minute: number;
  protected second: number;
  protected milisecond: number;

  constructor(
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth(),
    day: number = new Date().getDate(),
    hour: number = new Date().getHours(),
    minute: number = 0,
    second: number = 0,
    milisecond: number = 0,
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.milisecond = milisecond;
  }

  private getStrNumber = (num: number): string => {
    return num < 10 ? '0' + num : `${num}`;
  }

  public getDateString = (format:string): string => {
    switch(format){
      case Format.datetime: {
        return `${this.year}-${this.getStrNumber(this.month)}-${this.getStrNumber(this.day)} ${this.getStrNumber(this.hour)}:${this.getStrNumber(this.minute)}:${this.getStrNumber(this.second)}`;
      }

      case Format.datetimeWithMiliseconds: {
        return `${this.year}-${this.getStrNumber(this.month)}-${this.getStrNumber(this.day)} ${this.getStrNumber(this.hour)}:${this.getStrNumber(this.minute)}:${this.getStrNumber(this.second)}:${this.getStrNumber(this.milisecond)}`;
      }

      case Format.date: {
        return `${this.year}-${this.getStrNumber(this.month)}-${this.getStrNumber(this.day)}`;
      }

      case Format.time: {
        return `${this.getStrNumber(this.hour)}:${this.getStrNumber(this.minute)}:${this.getStrNumber(this.second)}`;
      }

      case Format.timeWithMiliseconds: {
        return `${this.getStrNumber(this.hour)}:${this.getStrNumber(this.minute)}:${this.getStrNumber(this.second)}:${this.getStrNumber(this.milisecond)}`;
      }

      default: {
        throw new Error('Invalid date format');
      }
    }
  }
}

export default Day;
