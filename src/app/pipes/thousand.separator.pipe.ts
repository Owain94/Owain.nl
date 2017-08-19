import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'thousandSeparator' })
export class ThousandSeparatorPipe implements PipeTransform {
  transform(inp: string): string {
    const d = +inp;
    return d.toLocaleString('nl-NL', { maximumFractionDigits: 0 });
  }
}
