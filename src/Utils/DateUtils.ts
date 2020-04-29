//@ts-ignore
import * as date from 'date-and-time';

import { Formats } from './Formats';


export default class DateUtils {
    constructor() {
        
    }

    formatDate(dt: Date, format: string, utc: boolean, offset: number = 0) {
        if (!offset) {
            return date.format(dt, format, utc);
        }
        let newDt = this.addMinutes(dt, offset);
        return date.format(newDt, format, utc);
    }

    parseDate(dt: string, fromFormat: string, utc: boolean, offset: number = 0) {
        let d = date.parse(dt, fromFormat, utc);
        if (!offset) {
            return d
        }
        let newDt = this.addMinutes(d, offset);
        return newDt;
    }




    addDays(currentDate: Date, daysToAdd: number) {
        return date.addDays(currentDate, daysToAdd);
    }

    addMonths(currentDate: Date, monothsToAdd: number) {
        return date.addMonths(currentDate, monothsToAdd);
    }

    addHours(currentDate: Date, hoursToAdd: number) {
        return date.addHours(currentDate, hoursToAdd);
    }

    addMinutes(currentDate: Date, minsToAdd: number) {
        return date.addMinutes(currentDate, minsToAdd);
    }

}