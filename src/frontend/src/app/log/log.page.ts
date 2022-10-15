/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Logs } from '../model/logModel';
import { DispositivoService } from '../services/dispositivo.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  public dispositivo: Dispositivo;
  public logs:  Array<Logs>;
  public idDispositivo: string;
  public electrovalvulaId: string;

  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private logService: LogsService) {
  }

  ngOnInit() {
    this.getLogs();
  }

  async getLogs() {
    //Se captura el valor enviado de la anterior pagina
    this.electrovalvulaId = this.router.snapshot.paramMap.get('id');

    let logriego = await this.logService.getLogsValvula(this.electrovalvulaId);
    this.logs=logriego;
  }
}
