import Validator from "./Validator";

interface IProps {
  isDateFormat: boolean;
}

export default class DateValidator implements Validator {
  private isDateFormat: boolean;

  constructor ({ isDateFormat = false }: IProps) {
    this.isDateFormat = isDateFormat;
  }

  private isDateFormatValidation = (dateString: string): boolean => {
    // Regular expression to match the desire date and time formats
    const dateTimeRegex = /^(?:(\d{4})-(\d{2})-(\d{2})(?:\s+))?((?:\d{2}):(?:\d{2}):(?:\d{2})(?::(?:\d{3}))?)?$/;

    // Check if the date and time strings match the desired formats
    if (!dateTimeRegex.test(dateString)) {
      return false;
    }

    // Split the date and time strings into components
    const [, year, month, day, hour, minute, second, millisecond] = dateTimeRegex.exec(dateString)!;

    // Validate date components if they exist
    if (year && month && day) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (
        date.getFullYear() !== Number(year) ||
        date.getMonth() + 1 !== Number(month) ||
        date.getDate() !== Number(day)
      ) {
        return false;
      }
    }

    // Validate time components if they exist
    if (hour && minute && second) {
      if (
        Number(hour) > 23 ||
        Number(minute) > 59 ||
        Number(second) > 59 ||
        (millisecond && Number(millisecond) > 999)
      ) {
        return false;
      }
    }

    // Return true if the date and time strings are valid
    return true;
  }

  validate = (dateString: string): boolean => {
    if (this.isDateFormat && !this.isDateFormatValidation(dateString)) {
      return false;
    }

    return true;
  };
}
