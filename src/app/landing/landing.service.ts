import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private http: HttpClient
  ) { }

  /* login(username: string, password: string) {
    return this.http.post(environment.api + environment.apiLogin, { username, password }).toPromise();
  } */

 /*  recoverPassword(email: string) {
    return this.http.post(environment.api + environment.apiLogin + environment.apiCambiarPassword, { email }).toPromise();
  } */

  login(username: string, password: string) {
    return this.http.post(environment.api + environment.apiLogin, { username, password });
  }

  resetPassword(email: string) {
    return this.http.post(environment.api + environment.apiLogin + environment.apiResetPassword, { email });
  }

  validarToken(body) {
    let ruta: string = environment.api + environment.apiLogin + environment.apiToken + environment.apiVerificarTokenAcceso;
    return this.http.post(ruta, body);
  }

  decifrarUID(token, uid) {
    let ruta: string = environment.api + environment.apiLogin + environment.apiResponseResetPassword + token + "/" + uid + "/";
    return this.http.get(ruta);
  }

  changePassword(body) {
    let ruta: string = environment.api + environment.apiLogin + environment.apiCambiarPassword;
    return this.http.post(ruta, body);
  }

}
