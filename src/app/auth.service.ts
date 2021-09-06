import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('access') ? true : false;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('rol') === "ADMINISTRADOR" ? true : false;
  }
}
