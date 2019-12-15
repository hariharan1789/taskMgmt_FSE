import {
  NgbDateParserFormatter,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
  constructor(private momentFormat: string) {
    super();
  }
  parse(res: string): NgbDateStruct {
    if (!res) {
      return null;
    }
    const dat = moment(res, this.momentFormat);
    return dat.isValid()
      ? { year: dat.year(), month: dat.month() + 1, day: dat.date() }
      : null;
  }

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const dt = moment({
      year: date.year,
      month: date.month - 1,
      date: date.day
    });
    return dt.isValid() ? dt.format(this.momentFormat) : '';
  }


}
