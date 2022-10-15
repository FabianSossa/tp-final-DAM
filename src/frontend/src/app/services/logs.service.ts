/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { Logs } from '../model/LogModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logs: Array<Logs> = new Array<Logs>();
  urlApi='http://localhost:8000/';

  constructor(private _http: HttpClient ) {
  }

  getLogsValvula(id): Promise<Logs[]> {
    return this._http.get(this.urlApi + 'api/logs/' + id + '/todas').toPromise().then((logsRiego: Logs[])=>logsRiego);
  }


  nuevaEntrada(log: Logs) {
    return this._http.post(this.urlApi + 'api/logs/agregar',{apertura:log.apertura, fecha:log.fecha.toISOString().slice(0, 19).replace('T', ' '), electrovalvulaId:log.electrovalvulaId}).toPromise().then((result)=>result);
  }
}
