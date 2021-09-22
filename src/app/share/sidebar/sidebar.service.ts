import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicadorUnoDetail, IndicadorDosDetail, IndicadorTresDetail } from 'src/app/dashboard/indicadores/indicadores.models';
import { FilterDataUno, FilterDataDos, FilterDataTres } from 'src/app/share/sidebar/sidebar.models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    filterDataUno$ = new EventEmitter<FilterDataUno>();
    filterDataDos$ = new EventEmitter<FilterDataDos>();
    filterDataTres$ = new EventEmitter<FilterDataTres>();

    activoUno = false;
    activoDos = false;
    activoTres = false;

  constructor( ) { }

}
