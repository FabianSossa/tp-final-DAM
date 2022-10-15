/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Dispositivo } from '../model/Dispositivo';
import { Logs } from '../model/LogModel';
import { Medicion } from '../model/Medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { LogsService } from '../services/logs.service';
import { MedicionService } from '../services/medicion.service';
import {Location} from '@angular/common';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  public dispositivo: Dispositivo;
  public estadoEV = false;
  public myChart;
  private chartOptions;
  public medicion: Medicion;
  public idDispositivo: string;
  public onEVError: boolean;
  private chartValue = 0;
  private chartName = '';
  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private medService: MedicionService,
     private logService: LogsService, private electroService: ElectrovalvulaService, private _location: Location ) {
     this.dispositivo = new Dispositivo ('', '', '', '');
  }

  ionViewDidEnter(){
    //Renderizamos el grafico
    this.generarChart();
  }

  ionViewWillEnter(){
    this.generarChart();
  }

  ngOnInit() {
    //Obtenemos los datos del dispositivo
    this.getDispositivo();
  }

  async getDispositivo() {
    //Se recupera el valor enviado por la anterior pagina
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    //Se llama al servicio para obtener los valores del dispositivo
    let dipositivo = await this.dispService.getDispositivo(this.idDispositivo);
    this.dispositivo = dipositivo[0];
    //Se llama al servicio de medicion para obtener la ultima
    let medDB = await this.medService.getMedicionByIdDispositivo(this.idDispositivo);
    this.medicion = medDB;
    this.chartValue = Number(this.medicion.valor);
    this.chartName = String(this.dispositivo.nombre);
    this.generarChart();

    try {
      this.onEVError = false;
      //Se llama al servicio de estado de electrovalvula
      this.estadoEV =  Boolean( await this.electroService.getEstadoActualEV(this.dispositivo.electrovalvulaId));
    }
    catch (error) {
      this.onEVError = true;
      this.estadoEV = false;
    }

  }

  cambiarEstadoElectro() {
    this.estadoEV = !this.estadoEV;
    let now = new Date();
    //Agregamos el log de estado de la electrovalvula
    this.logService.nuevaEntrada(new Logs(0,  Number(this.estadoEV), now , this.dispositivo.electrovalvulaId));
    if (!this.estadoEV){
      //Agregar la nueva medicion del dispositivo al cerrar la electrovalvula
      this.medService.agregarMedicion(new Medicion(0, now, Math.floor(Math.random() * (100 - 0) + 0), this.dispositivo.dispositivoId));
      this.chartValue = Number(Math.floor(Math.random() * (100 - 0) + 0));
      this.updateChart();
    }
  }

  updateChart() {
    this.myChart.update({series: [{
      name: 'kPA',
      data: [this.chartValue],
      tooltip: {
          valueSuffix: ' kPA'
      }
    }]});
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: '300px'
        }
        ,title: {
          text: [this.chartName]
        }
        ,credits:{enabled:false}
        ,pane: {
            startAngle: -150,
            endAngle: 150,

            center: ['50%', '50%'],
            size: '100%'
        }
        ,yAxis: {
          min: 0,
          max: 100,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto'
          },
          title: {
              text: 'Humedad de Suelo'
          },
          plotBands: [{
              from: 0,
              to: 10,
              color: '#000000' // black
          }, {
              from: 10,
              to: 30,
              color: '#55BF3B' // green
          }, {
              from: 30,
              to: 60,
              color: '#DDDF0D' // yellow
          }, {
              from: 60,
              to: 100,
              color: '#DF5353' // red
          }]
    }
    ,
    series: [{
        name: 'Cb',
        data: [Number(this.chartValue)],
        tooltip: {
            valueSuffix: ' kPa'
        }
    }]
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }
}
