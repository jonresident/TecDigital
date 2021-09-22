import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgwWowService } from 'ngx-wow';
import * as Vivus from 'vivus';
import * as bodymovin from "bodymovin";
import lottie from "lottie-web";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LandingService } from '../landing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styles: [
  ]
})
export class RecoverpasswordComponent implements OnInit {

  cargando = false;
  formRecoverPassword: FormGroup;
  landingSubscription = new Subscription();

  windowScrolled: boolean;
  Vivus: any;

  constructor(
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
      new Vivus('icono_bios', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }, function doDone(obj) {
        obj.el.classList.add('finished');
      }).reset();
    }
  }

  ngOnInit(): void {
    this.formRecoverPasswordInit();
    this.initbodymovin();
    this.wowService.init();
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

  formRecoverPasswordInit() {
    this.formRecoverPassword = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(254)])
    }, {
      validators: [this.validateEmail]
    });
  }

  validateEmail: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const email = group.get('email').value;
    return this.validateEmailFn(email) ? null : { failEmail: true };
  }

  validateEmailFn(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
  }


  onRecover(values: { email: string }) {

    this.cargando = true;
    this.landingSubscription = this.landingService.resetPassword(values.email).subscribe({
      next: (resp: any) => {
        this.cargando = false;
        if (resp.ok) {
          Swal.fire({
            icon: 'info',
            title: 'Restablecer contraseña',
            text: 'Si está registrado en el sistema, se enviará un enlace de restablecimiento de contraseña a este correo.'
          }).then(() => {
            this.router.navigate(['landing']);
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Restablecer contraseña',
            text: 'Respuesta inesperada del servidor, comuniquese con soporte técnico'
          }).then(() => {
            this.router.navigate(['landing']);
          });
        }
      },
      error: (e) => {
        this.cargando = false;
        if (e.error) {
          console.log(e.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Ocurrió un error en la solicitud de restableciento de contraseña"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Servidor sin respuesta. Intentelo más tarde.'
          });
        }
      }
    });
  }
}
