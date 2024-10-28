import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hufCurrency'
})
export class HufCurrencyPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string | null {
    if (value == null || Number.isNaN(+value)) return null;
    const formattedValue = parseInt(value.toString(), 10)
      .toLocaleString('hu-HU')
      .replace(/,/g, ' ');
    return formattedValue + ' Ft';
  }

}
