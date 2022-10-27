import { Pipe, PipeTransform } from '@angular/core';
import { roundToTwoDecimals } from '../common/functions';

@Pipe({
  name: 'LogNumberPipe'
})
export class LogNumberPipe implements PipeTransform {

  transform(value: number): unknown {
    const roundedValue = roundToTwoDecimals(value); 
    return roundedValue < 0 ? 0.00 : roundedValue;
  }

}
