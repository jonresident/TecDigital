import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyCrearUsuario, Usuario, BodyActualizarUsuario } from './usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(body: BodyCrearUsuario): Promise<any> {
    return this.http.post<any>(
      environment.api + environment.apiUsuarios + environment.apiCrearUsuario,
      body
    ).toPromise();
  }

  getUsers(): Promise<Usuario[]> {
    return this.http.get<Usuario[]>(environment.api + environment.apiUsuarios+ environment.apiListarUsuarios).toPromise();
  }

  updateUser(body: BodyActualizarUsuario): Promise<any> {
    return this.http.put<any>(
      environment.api + environment.apiUsuarios + environment.apiActualizarUsuario,
      body
    ).toPromise();
  }
}
