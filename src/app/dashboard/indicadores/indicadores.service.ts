import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndicadorUnoDetail, IndicadorDosDetail } from './indicadores.models';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresService {
    cambioIndicador$ = new EventEmitter<boolean>();

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

    getOferentes(body){
        let ruta: string = environment.api + environment.apiResultados + environment.apiOferentes;
        return this.http.post(ruta, body);
    }

    getLeads(body){
        let ruta: string = environment.api + environment.apiResultados + environment.apiLeads;
        return this.http.post(ruta, body);
    }

    validarToken(body){
        let ruta: string = environment.api + environment.apiLogin + environment.apiToken + environment.apiVerificarTokenAcceso;
        return this.http.post(ruta, body);
    }

    /* getMapa() {
        let ruta = '../../../assets/data/COLOMBIADEP.json';
        return this.http.get(ruta);
    } */

}