import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndicadorUnoDetail, IndicadorDosDetail } from './indicadores.models';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresService {
    constructor(
        private http: HttpClient
    ) { }

    getBeneficiarias(){
        return this.http.get(environment.apiBeneficiarias);
    }

    getOferentes(){
        return this.http.get(environment.apiOferentes);
    }

    getTabla(): Observable<IndicadorUnoDetail> {
        return this.http.get<IndicadorUnoDetail>(environment.apiBeneficiarias);
    }

}