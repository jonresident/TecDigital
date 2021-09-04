import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { IndicadoresService } from '../indicadores/indicadores.service';
import { Tabla, IndicadorUnoDetail } from '../indicadores/indicadores.models';
import { IndicadorUnoComponent } from '../indicadores/indicadorUno/indicador-uno.component';
import { Subscription } from 'rxjs';
import { PreloadService } from '../dashboard.service';

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
    private preloadService: PreloadService,
    private indicadorService: IndicadoresService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    this.obtenerDatos();
  }
  
  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  obtenerDatos() {
    this.serviceSubscription = this.indicadorService.getTabla().subscribe((resp: IndicadorUnoDetail) => {

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
          SitioWeb: resp.tabla.SitioWeb[i]
        }

        registros.push(Object.assign({}, registro));
      }

      this.datos = registros;

      setTimeout(() => {
        this.preloadService.cargando$.emit(false);
      });

      /* this.preloadService.cargando$.emit(false); */

    })

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
