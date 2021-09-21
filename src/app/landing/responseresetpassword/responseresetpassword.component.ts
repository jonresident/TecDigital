import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LandingService } from '../landing.service';
import { PreloadService } from '../../dashboard/dashboard.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-responseresetpassword',
  templateUrl: './responseresetpassword.component.html',
  styles: [
  ]
})
export class ResponseresetpasswordComponent implements OnInit {

  validacionSubscription = new Subscription();
  decifrarSubscription = new Subscription();

  uid: string;
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private preloadService: PreloadService,
    private landingService: LandingService
  ) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });

    

    this.uid = this.route.snapshot.paramMap.get('uid');
    this.token = this.route.snapshot.paramMap.get('token');


    this.decifrarSubscription = this.landingService.decifrarUID(this.token, this.uid).subscribe({
      next: (resp: any) => {
        
        setTimeout(() => {
          this.preloadService.cargando$.emit(false);
        });
        this.authService.resetPassword = true;
        sessionStorage.setItem('username', resp['username']);
        sessionStorage.setItem('id', resp['pk']);
        this.router.navigate(['/changepassword']);
      },
      error: (e) => {
        setTimeout(() => {
          this.preloadService.cargando$.emit(false);
        });

        if (e.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Existen problemas con el restablecimiento de contraseña, contacte a soporte técnico"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Servidor sin respuesta. Intentelo más tarde.'
          });
        }
        
        sessionStorage.clear();
        this.router.navigate(['/landing']);
      }
    });
  }

}
