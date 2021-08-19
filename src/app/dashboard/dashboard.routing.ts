import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// dash components
import { DashboardComponent } from './dashboard.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { IndicadorUnoComponent } from './indicadores/indicadorUno/indicador-uno.component';
import { IndicadorDosComponent } from './indicadores/indicadorDos/indicador-dos.component';
import { IndicadorTresComponent } from './indicadores/indicadorTres/indicador-tres.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {path: '', pathMatch: 'prefix', redirectTo: 'indicadores'},
            {
                path: 'indicadores', component: IndicadoresComponent,
                children: [
                    {path: '', pathMatch: 'prefix', redirectTo: 'indicadorUno'},
                    {path: 'indicadorUno', component: IndicadorUnoComponent},
                    {path: 'indicadorDos', component: IndicadorDosComponent},
                    {path: 'indicadorTres', component: IndicadorTresComponent}
                ]
            },
            {path: 'usuarios', component: UsuariosComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
