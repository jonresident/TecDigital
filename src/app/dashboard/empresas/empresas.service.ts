import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndicadorUnoDetail } from '../indicadores/indicadores.models';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService {
    constructor(
        private http: HttpClient
    ) { }

    getEmpresasBeneficiarias(): Observable<IndicadorUnoDetail> {
        let ruta: string = environment.api + environment.apiResultados + environment.apiBeneficiarias;
        let body = 
        {
            "idUser": sessionStorage.getItem('id')
        };
        return this.http.post<IndicadorUnoDetail>(ruta, body);
    }

}