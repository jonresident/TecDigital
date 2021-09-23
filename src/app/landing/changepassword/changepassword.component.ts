import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgwWowService } from 'ngx-wow';
import * as Vivus from 'vivus';
import * as bodymovin from "bodymovin";
import lottie from "lottie-web";
import Swal from 'sweetalert2';
import { LandingService } from '../landing.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
declare var $: any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styles: [
  ]
})
export class ChangepasswordComponent implements OnInit {

  cargando = false;
  changeSubscription = new Subscription();

  formChangePassword: FormGroup;

  windowScrolled: boolean;
  Vivus: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private landingService: LandingService,
    private wowService: NgwWowService,
    @Inject(DOCUMENT) private document: Document) {
    this.wowService.init();
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  ngOnInit(): void {
    this.authService.resetPassword = false;
    this.cargando = true;
    this.initbodymovin();
    this.wowService.init();
    this.formChangePasswordInit();
    this.cargando = false;
    
    
  }

  initbodymovin() {
    lottie.loadAnimation({
      container: document.getElementById('logoBiosAnimated'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/packages/lf20_tnczcwop/Logo/data.json'
    })
  }

  reset() {
    this.wowService.init();
  }

  onChangePassword(values: { password: string, confirmPassword: string }) {

    this.cargando = true;
    const body = {
      id: sessionStorage.getItem('id'),
      username: sessionStorage.getItem('username'),
      password1: values.password,
      password2: values.confirmPassword,
      reset_last_login: false
    }
    this.changeSubscription = this.landingService.changePassword(body).subscribe({
      next: (resp: any) => {
        this.cargando = false;
        if (resp.ok !== null) {
          Swal.fire({
            icon: 'info',
            title: 'Cambio exitoso',
            text: "Se ha cambiado exitosamente la contraseña"
          }).then(() => {
            sessionStorage.clear();
            this.router.navigate(['landing']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Se está ocasionando un error desconocido en el cambio de contraseña"
          }).then(() => {
            sessionStorage.clear();
            this.router.navigate(['landing']);
          });
        }

      },
      error: (e) => {
        this.cargando = false;
        if (e.error && e.error.Error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Error al tratar de restablecer la contraseña, contacte a soporte técnico"
          }).then(() => {
            sessionStorage.clear();
            this.router.navigate(['landing']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Servidor sin respuesta. Intentelo más tarde.'
          }).then(() => {
            sessionStorage.clear();
            this.router.navigate(['landing']);
          });
        }
      }
    });

  }


  formChangePasswordInit() {
    this.formChangePassword = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.maxLength(128), Validators.minLength(8)]),
      confirmPassword: new FormControl(null),
    }, {
      validators: [this.checkPasswords]
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

}
