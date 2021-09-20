import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-responseresetpassword',
  templateUrl: './responseresetpassword.component.html',
  styles: [
  ]
})
export class ResponseresetpasswordComponent implements OnInit {

  validacionSubscription = new Subscription();

  uid: string;
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private landingService: LandingService
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.token = this.route.snapshot.paramMap.get('token');

    this.validacionSubscription = this.landingService.validarToken(
      {
        "token": this.token
      }).subscribe({
        next: (resp: any) => {

          /* Escribir código aqui */

        }/* ,
        error: (e) => {
          setTimeout(() => {
            this.preloadService.cargando$.emit(false);
          });
          sessionStorage.clear();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Su sesión ha expirado, será redirigido al login de la plataforma"
          }).then(() => {
            this.router.navigate(['/landing']);
          });
        } */
      });


    this.router.navigate(['/recoverpassword']);
  }

}
