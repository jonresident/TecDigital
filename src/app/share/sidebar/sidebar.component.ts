import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  dropdownFilter = null;
  dropdownFilter2 = null;
  dropdownFilter3 = null;
  aFiltrosSeleccionados = [];

  aArray = [
    'Ruta 1', 'Ruta 2', 'Ruta 3', 'Ruta 4'
  ];
  aArray2 = [
    'Ciclo 1', 'Ciclo 2', 'Ciclo 3', 'Ciclo 4'
  ];
  aArray3 = [
    'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  fn_cerrar() {
    this.dropdownFilter = null;
  }

  fn_setFilter( dropdownName, dropdownValue ) {

    let aTempFilter = [];
    aTempFilter = this.aFiltrosSeleccionados.filter(function(value, index) {
        return dropdownName !== value.dropdownName;
    });
    aTempFilter.push({'dropdownName': dropdownName,'dropdownValue': dropdownValue});
    this.aFiltrosSeleccionados = aTempFilter
  }

  fn_removeFilter( dropdownName ) {
    this.aFiltrosSeleccionados = this.aFiltrosSeleccionados.filter(function(value, index, arr) {
        return dropdownName !== value.dropdownName;
    });
    this[dropdownName] = null;
  }

}
