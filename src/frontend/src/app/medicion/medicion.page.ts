import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {

  public dispositivo: Dispositivo;
  public idDispositivo: string;
  public mediciones:  Array<Medicion>;

  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private medService: MedicionService) { }

  ngOnInit() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispService.getDispositivo(this.idDispositivo).then((disp)=>{
      this.dispositivo=disp;
    });

    this.medService.getMedicionesByIdDispositivo(this.idDispositivo).then((med)=>{
      this.mediciones = med;
    });
  }

}
