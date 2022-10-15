import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abrCerr'
})
export class AbrCerrPipe implements PipeTransform {

  transform(value: number): string {
    return value? 'ABIERTA':'CERRADA';
  }

}
