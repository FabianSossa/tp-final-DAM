import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionPageRoutingModule } from './medicion-routing.module';

import { MedicionPage } from './medicion.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionPageRoutingModule,
    RouterModule
  ],
  declarations: [MedicionPage]
})
export class MedicionPageModule {}
