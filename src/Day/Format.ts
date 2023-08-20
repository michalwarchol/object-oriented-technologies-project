import moment from 'moment';

class Format {
  static datetime = 'YYYY-MM-DD HH-mm-ss';
  static datetimeWithMiliseconds = 'YYYY-MM-DD HH-mm-ss:sss';
  static date = 'YYYY-MM-DD';
  static time = 'HH-mm-ss';
  static timeWithMiliseconds = 'HH-mm-ss:sss';

  static getDateValues = (dateString: string) => {
    const date = moment(dateString);

    return {
      year: date.get('year'),
      month: date.get('month') + 1,
      day: date.get('date'),
      hour: date.get('hour'),
      minute: date.get('minute'),
      second: date.get('second'),
    };
  };
}

export default Format;
