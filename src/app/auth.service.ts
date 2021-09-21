import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  resetPassword: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('access') ? true : false;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('rol') === "ADMINISTRADOR" ? true : false;
  }

  isResetPassword(): boolean {
    return this.resetPassword;
  }
}
