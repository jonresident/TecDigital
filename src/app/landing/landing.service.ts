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

  login(username: string, password: string) {
    return this.http.post(environment.api + environment.apiLogin, { username, password }).toPromise();
  }

  recoverPassword(email: string) {
    return this.http.post(environment.api + environment.apiLogin + environment.apiCambiarPassword, {email}).toPromise();
  }

  /* login(username: string, password: string) {
    return this.http.post(environment.api + environment.apiLogin, { username, password });
  }
 */
}
