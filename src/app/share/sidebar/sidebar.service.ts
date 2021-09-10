import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicadorUnoDetail, IndicadorDosDetail, IndicadorTresDetail } from 'src/app/dashboard/indicadores/indicadores.models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    dataUno : IndicadorUnoDetail;
    dataUno$ = new EventEmitter<IndicadorUnoDetail>();
    dataDos$ = new EventEmitter<IndicadorDosDetail>();
    dataTres$ = new EventEmitter<IndicadorTresDetail>();

  constructor(
    private http: HttpClient
  ) { }

}
