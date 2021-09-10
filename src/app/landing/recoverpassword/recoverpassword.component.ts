import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgwWowService } from 'ngx-wow';
import * as Vivus from 'vivus';
import * as bodymovin from "bodymovin";
import lottie from "lottie-web";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../landing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
          new Vivus('icono_bios',{
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

  formRecoverPasswordInit() {
    this.formRecoverPassword = new FormGroup({
      email: new FormControl(null, [Validators.required])
    });
  }


  onRecover(values: { email: string }) {
    /* this.cargando = true;
    this.landingService.recoverPassword(values.email)
    .then(ans => {
      this.cargando = false;
    }).catch(err => this.cargando = false); */
    console.log("ENVIAR CORREO")
    Swal.fire({
      icon: 'info',
      title: 'Restablecer contraseña',
      text: 'Se enviará un enlace de restablecimiento de contraseña a este correo si está registrado en el sistema'
    }).then( () => {
      this.router.navigate(['landing']);
    });
  }

}
