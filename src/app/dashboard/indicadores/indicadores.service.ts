import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IndicadorUnoDetail, IndicadorDosDetail } from './indicadores.models';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresService {
    constructor(
        private http: HttpClient
    ) { }

    /* getBeneficiarias(): Promise<IndicadorUnoDetail> {
        return this.http.get<IndicadorUnoDetail>(environment.api).toPromise();
    } */
    getBeneficiarias(){
        return this.http.get(environment.api);
    }

}