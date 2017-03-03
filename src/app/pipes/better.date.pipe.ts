import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'betterDate' })
export class BetterDatePipe implements PipeTransform {

  transform(date: number): string {

    const d = new Date(date);
    return d.toLocaleDateString();
  }
}
