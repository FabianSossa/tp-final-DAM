/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Medicion } from '../model/medicion';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  urlApi='http://localhost:8000/';

  constructor(private _http: HttpClient ) {
  }

  getMedicionByIdDispositivo(id): Promise<Medicion>{
    return this._http.get(this.urlApi + 'api/medicion/' + id).toPromise().then((med: Medicion)=>med);
  };

  getMedicionesByIdDispositivo(id): Promise<Medicion[]>{
    return this._http.get(this.urlApi + 'api/medicion/' + id + '/todas').toPromise().then((mediciones: Medicion[])=>mediciones);
  };

  agregarMedicion(medicion: Medicion){
    return this._http.post(this.urlApi + 'api/medicion/agregar',{fecha:medicion.fecha.toISOString().slice(0, 19).replace('T', ' '),valor:medicion.valor,dispositivoId:medicion.dispositivoId}).toPromise().then((result)=>result);
  }
}
