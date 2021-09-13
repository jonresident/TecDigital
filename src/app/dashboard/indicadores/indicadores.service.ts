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

    /* getBeneficiarias(){
        return this.http.get(environment.api + environment.apiResultados + environment.apiBeneficiarias);
    }

    getOferentes(){
        return this.http.get(environment.api + environment.apiResultados + environment.apiOferentes);
    } */

    getBeneficiarias(body){
        let ruta: string = environment.api + environment.apiResultados + environment.apiBeneficiarias;
        return this.http.post(ruta, body);
    }

    getOferentes(){
        let ruta: string = environment.api + environment.apiResultados + environment.apiOferentes;
        let body = 
        {
            "idUser": sessionStorage.getItem('id')
        };
        return this.http.post(ruta, body);
    }

    getLeads(){
        let ruta: string = environment.api + environment.apiResultados + environment.apiLeads;
        return this.http.get(ruta);
    }

}