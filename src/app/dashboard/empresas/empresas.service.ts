import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { number } from 'echarts';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndicadorUnoDetail } from '../indicadores/indicadores.models';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService {

    numeroEmpresas$ = new EventEmitter<number>();
    activo: boolean = false;

    constructor(
        private http: HttpClient
    ) { }

    /* getEmpresasBeneficiarias(): Observable<IndicadorUnoDetail> {
        let ruta: string = environment.api + environment.apiResultados + environment.apiBeneficiarias;
        let body = 
        {
            "idUser": sessionStorage.getItem('id')
        };
        return this.http.post<IndicadorUnoDetail>(ruta, body);
    } */

    getEmpresasBeneficiarias() {
        let ruta: string = environment.api + environment.apiResultados + environment.apiBeneficiarias;
        let body = 
        {
            "idUser": sessionStorage.getItem('id'),
            "fecha": new Date(),
            "departamento": "todos"
        };
        return this.http.post(ruta, body);
    }


    validarToken(body){
        let ruta: string = environment.api + environment.apiLogin + environment.apiToken + environment.apiVerificarTokenAcceso;
        return this.http.post(ruta, body);
    }
}