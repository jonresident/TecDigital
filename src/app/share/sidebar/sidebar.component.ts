import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IndicadorUnoDetail } from 'src/app/dashboard/indicadores/indicadores.models';
import { IndicadoresService } from 'src/app/dashboard/indicadores/indicadores.service';
import { IndicadorUnoComponent } from 'src/app/dashboard/indicadores/indicadorUno/indicador-uno.component';
import { FilterDataDos, FilterDataTres, FilterDataUno } from './sidebar.models';
import { SidebarService } from './sidebar.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  deptoFilter = null;
  dateInitFilter = null;
  dateFinFilter = null;
  aFiltrosSeleccionados = [];
  indicadorSubscription = new Subscription();

  deptoFilterDisable: boolean = false;
  dateFilterDisable: boolean = false;
  botonAplicarDisable: boolean = false;

  aArray2 = [
    'ANTIOQUIA', 'ATLANTICO', 'SANTAFE DE BOGOTA D.C', 'BOLIVAR', 'BOYACA', 'CALDAS', 'CAQUETA', 'CAUCA', 'CESAR', 'CORDOBA', 'CUNDINAMARCA', 'CHOCO', 'HUILA', 'LA GUAJIRA', 'MAGDALENA', 'META', 'NARIÑO', 'NORTE DE SANTANDER', 'QUINDIO', 'RISARALDA', 'SANTANDER', 'SUCRE', 'TOLIMA', 'VALLE DEL CAUCA', 'ARAUCA', 'CASANARE', 'PUTUMAYO', 'AMAZONAS', 'GUAINIA', 'GUAVIARE', 'VAUPES', 'VICHADA', 'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA'
  ];

  constructor(
    private indicadoresService: IndicadoresService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.reiniciarFiltros();
  }

  ngOnDestroy(): void {
    this.indicadorSubscription.unsubscribe();
  }


  fn_setFilter(dropdownName, dropdownValue) {

    let aTempFilter = [];
    aTempFilter = this.aFiltrosSeleccionados.filter(function (value, index) {
      return dropdownName !== value.dropdownName;
    });
    aTempFilter.push({ 'dropdownName': dropdownName, 'dropdownValue': dropdownValue });
    this.aFiltrosSeleccionados = aTempFilter
  }

  fn_removeFilter(dropdownName) {
    this.aFiltrosSeleccionados = this.aFiltrosSeleccionados.filter(function (value, index, arr) {
      return dropdownName !== value.dropdownName;
    });
    this[dropdownName] = null;
    this.aplicarFiltros();
  }

  reiniciarFiltros() {
    this.indicadorSubscription = this.indicadoresService.cambioIndicador$.subscribe({
      next: (resp) => {
        if (resp) {
          this.aFiltrosSeleccionados = [];
          this.deptoFilter = null;
          this.dateFinFilter = null;

          if (this.sidebarService.activoUno) {
            this.deptoFilterDisable = false;
            this.dateFilterDisable = false;
            this.botonAplicarDisable = false;
          } else if (this.sidebarService.activoDos) {
            this.deptoFilterDisable = true;
            this.dateFilterDisable = false;
            this.botonAplicarDisable = false;
          } else if (this.sidebarService.activoTres) {
            this.deptoFilterDisable = true;
            this.dateFilterDisable = false;
            this.botonAplicarDisable = false;
          }
        }
      }
    });
  }

  aplicarFiltros() {
    let depto: string;
    if (this.deptoFilter === "SANTAFE DE BOGOTA D.C") {
      depto ="BOGOTÁ, D. C.";
    }
    else {
      depto = this.deptoFilter;
    }
    
    if (this.sidebarService.activoUno){
      let body: FilterDataUno = {
        "idUser": sessionStorage.getItem('id'),
        "fecha": this.dateFinFilter !== null ? this.dateFinFilter : new Date().toISOString().substr(0,10),
        "departamento": depto !== null ? depto : "todos"
      };
      this.sidebarService.filterDataUno$.emit(body);
    } else if (this.sidebarService.activoDos) {
      let body: FilterDataDos = {
        "idUser": sessionStorage.getItem('id'),
        "fecha": this.dateFinFilter !== null ? this.dateFinFilter : new Date().toISOString().substr(0,10),
      };
      this.sidebarService.filterDataDos$.emit(body);
    } else if (this.sidebarService.activoTres) {

      let body: FilterDataTres = {
        "idUser": sessionStorage.getItem('id'),
        "fecha": this.dateFinFilter !== null ? this.dateFinFilter : new Date().toISOString().substr(0,10)
      };
      this.sidebarService.filterDataTres$.emit(body);
    }
        
  }

}