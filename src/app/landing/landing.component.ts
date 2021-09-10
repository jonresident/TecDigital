import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgwWowService } from 'ngx-wow';
import * as Vivus from 'vivus';
import * as bodymovin from "bodymovin";
import lottie from "lottie-web";
import Swal from 'sweetalert2';

import { LandingService } from '../landing/landing.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [
  ]
})
export class LandingComponent implements OnInit {

  cargando = false;
  formLogin: FormGroup;

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
      }
  }

  ngOnInit(): void {
    this.formLoginInit();
    this.initbodymovin();
    this.wowService.init();
  }

  formLoginInit() {
    this.formLogin = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  initbodymovin() {
    lottie.loadAnimation({
      container:document.getElementById('logoBiosAnimated'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/packages/lf20_tnczcwop/Logo/data.json'
    })
  }

  reset() {
    this.wowService.init();
  }

  onSumbit(values: { username: string; password: string; }) {
    this.cargando = true;
    /* this.landingService.login(values.username, values.password).subscribe((resp) => {
      this.cargando = false;
      sessionStorage.setItem('refresh', resp['refresh']);
      sessionStorage.setItem('access', resp['access']);
      sessionStorage.setItem('username', resp['username']);
      sessionStorage.setItem('id', resp['id']);
      sessionStorage.setItem('first_session', resp['first_session']);
      sessionStorage.setItem('rol', resp['rol']);
      this.router.navigate(['dashboard']);
    }); */











    this.landingService.login(values.username, values.password)
    .then(ans => {
      this.cargando = false;
      sessionStorage.setItem('refresh', ans['refresh']);
      sessionStorage.setItem('access', ans['access']);
      sessionStorage.setItem('username', ans['username']);
      sessionStorage.setItem('id', ans['id']);
      sessionStorage.setItem('first_session', ans['first_session']);
      sessionStorage.setItem('rol', ans['rol']);
      this.router.navigate(['dashboard']);
    }).catch(error => {
      this.cargando = false;
      if (error.error && error.error.Error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las credenciales no son válidas, intente de nuevo.'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Servidor sin respuesta. Intentelo más tarde.'
        });
      }
    });
  }

}
