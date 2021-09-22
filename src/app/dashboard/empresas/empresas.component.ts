import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { Tabla, IndicadorUnoDetail } from '../indicadores/indicadores.models';
import { IndicadorUnoComponent } from '../indicadores/indicadorUno/indicador-uno.component';
import { Subscription } from 'rxjs';
import { PreloadService } from '../dashboard.service';
import { EmpresasService } from './empresas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// Pipe
/* import { FilterPipe } from '../../filter.pipe'; */

declare var $: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent implements OnInit, OnDestroy {

  datos = [];
  serviceSubscription = new Subscription();
  cantRegistrosSubscripcion = new Subscription();
  validacionSubscription = new Subscription();

  cantRegistros: number = 0;


  key: string = 'Usuario';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public searchFilterUser: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
    id: 'tableUsers',
    itemsPerPage: 5,
    currentPage: 1
  };
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(
    private router: Router,
    private preloadService: PreloadService,
    private empresasService: EmpresasService,
  ) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    this.obtenerDatos();
    this.changeCantRegistros();
    this.empresasService.activo = true;
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.cantRegistrosSubscripcion.unsubscribe();
    this.validacionSubscription.unsubscribe();
    this.empresasService.activo = false;
  }

  changeCantRegistros() {
    this.cantRegistrosSubscripcion = this.empresasService.numeroEmpresas$.subscribe({
      next: (resp: number) => {
        this.cantRegistros = resp;
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Ocurrio un error inesperado cargando la cantidad de registros al filtrar. comuniquese con soporte técnico"
        });
      }
    });
  }

  obtenerDatos() {
    this.validacionSubscription = this.empresasService.validarToken(
      {
        "token": sessionStorage.getItem('access')
      }).subscribe({
        next: (resp: any) => {
          this.serviceSubscription = this.empresasService.getEmpresasBeneficiarias().subscribe({
            next: (resp: any) => {
              let registro = {};
              let registros = [];
      
              for (let i = 0; i < resp.tabla.NombreEmpresa.length; i++) {
                registro = {
                  NombreEmpresa: resp.tabla.NombreEmpresa[i],
                  Direccion: resp.tabla.Direccion[i],
                  Departamento: resp.tabla.Departamento[i],
                  Telefono: resp.tabla.Telefono[i],
                  CorreoElectronico: resp.tabla.CorreoElectronico[i],
                  NombresRepresentanteLegal: resp.tabla.NombresRepresentanteLegal[i],
                  ApellidosRepresentanteLegal: resp.tabla.ApellidosRepresentanteLegal[i],
                  NombresPersonaEncargadaProceso: resp.tabla.NombresPersonaEncargadaProceso[i],
                  ApellidosPersonaE: resp.tabla.ApellidosPersonaE[i],
                  CorreoElectronicoPersonaEncargadaProceso: resp.tabla.CorreoElectronicoPersonaEncargadaProceso[i],
                  TelefonoPersonaEncargadaProceso: resp.tabla.TelefonoPersonaEncargadaProceso[i],
                  SitioWeb: resp.tabla.SitioWeb[i],
                  categoria: resp.tabla.categoria[i],
                  TamanoEmpresa: resp.tabla.TamanoEmpresa[i],
                  FechaFinDatosBasicos: resp.tabla.FechaFinDatosBasicos[i]
                }
      
                registros.push(Object.assign({}, registro));
              }
      
              this.datos = registros;
              this.cantRegistros = this.datos.length;
      
              setTimeout(() => {
                this.preloadService.cargando$.emit(false);
              });
            },
            error: (e) => {
              setTimeout(() => {
                this.preloadService.cargando$.emit(false);
              });
              if (e.error && e.error.Error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: e.error.Error
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
        },
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
        }
      });

    
  }

  setItemPerPage(event: any) {
    this.config.itemsPerPage = event.target.value;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }

}
