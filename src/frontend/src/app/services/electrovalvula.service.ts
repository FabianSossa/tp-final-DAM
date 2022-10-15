/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {
  urlApi='http://localhost:8000/';

  constructor(private _http: HttpClient ) {
  }

  async getEstadoActualEV(id): Promise<number> {
    try {
      const respuesta: any = this._http.get(this.urlApi + 'api/logs/' + id).toPromise();
      if(respuesta.__zone_symbol__state == null){
        return 0;
      } else {
        return (await respuesta).apertura;
      }
    }
    catch (error)
    {
      return (0);
    }
  }
}
