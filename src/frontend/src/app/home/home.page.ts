/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
import { Component } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listadoDispositivo: Dispositivo[];

  constructor(public dispositivoServ: DispositivoService) { }

  ngOnInit(){
    this.dispositivoServ.getListaDispositivo().then((listado) => {
      this.listadoDispositivo = listado;
    });
  }

}
