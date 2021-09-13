import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicadorUnoDetail, IndicadorDosDetail, IndicadorTresDetail } from 'src/app/dashboard/indicadores/indicadores.models';
import { FilterData } from 'src/app/share/sidebar/sidebar.models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    filterData$ = new EventEmitter<FilterData>();

  constructor( ) { }

}
