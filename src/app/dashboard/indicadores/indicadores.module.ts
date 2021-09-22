import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Module router
import { RouterModule } from '@angular/router';

// External Modules
import { ShareModule } from '../../share/share.module';

import { IndicadoresComponent } from '../indicadores/indicadores.component';
import { IndicadorUnoComponent } from '../indicadores/indicadorUno/indicador-uno.component';
import { IndicadorDosComponent } from '../indicadores/indicadorDos/indicador-dos.component';
import {IndicadorTresComponent } from './indicadorTres/indicador-tres.component';



@NgModule({
  declarations: [
    IndicadoresComponent,
    IndicadorUnoComponent,
    IndicadorDosComponent,
    IndicadorTresComponent
  ],
  exports: [
    IndicadoresComponent,
    IndicadorUnoComponent,
    IndicadorDosComponent,
    IndicadorTresComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ShareModule
  ]
})
export class IndicadoresModule { }
