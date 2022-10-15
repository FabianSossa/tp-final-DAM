/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  urlApi = 'http://localhost:8000';

  constructor(private _http: HttpClient) {
  }

  getListaDispositivo(): Promise<Dispositivo[]>{
  return this._http.get(this.urlApi+ '/api/dispositivo/').toPromise().then((listado: Dispositivo[])=>{
    return listado;
  });
  }

  getDispositivo(id): Promise<Dispositivo>{
    return this._http.get(this.urlApi + '/api/dispositivo/' + id).toPromise().then((dispositivo: Dispositivo)=>{
      return dispositivo;
    });
  };
}
