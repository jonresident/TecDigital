import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module router
import { RouterModule } from '@angular/router';

// Services
import { FormsModule } from '@angular/forms';

// External Modules
import { ShareModule } from '../share/share.module';
import { IndicadoresModule } from '../dashboard/indicadores/indicadores.module'

import { DashboardComponent } from './dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Pipe
import { FilterPipe } from '../filter.pipe';

// Modulos Externos Angular
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    FilterPipe,
    DashboardComponent,
    UsuariosComponent
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ShareModule,
    IndicadoresModule
  ]
})
export class DashboardModule { }
