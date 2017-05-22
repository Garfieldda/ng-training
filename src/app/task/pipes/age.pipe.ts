import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  public transform(value: any, now: number): any {
    let check: number = Date.parse(value);
    let sumSec: number = Math.floor((now - check) / 1000 );

    let day: number = Math.floor(sumSec / (3600 * 24));
    sumSec = sumSec - (day * (3600 * 24));

    let hour : number = Math.floor(sumSec / 3600);
    sumSec = sumSec - (hour * 3600);

    let min: number = Math.floor(sumSec / 60);
    sumSec = sumSec - (min * 60);

    let sec: number = Math.floor(sumSec);

    return day.toString() + " day  " +
        ("0" + hour).toString().slice(-2) + ":" +
        ("0" + min).toString().slice(-2) + ":" +
        ("0" + sec).toString().slice(-2);
  }

}
