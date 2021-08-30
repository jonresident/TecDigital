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

  aArray2 = [
    'ANTIOQUIA','ATLANTICO','SANTAFE DE BOGOTA D.C','BOLIVAR','BOYACA','CALDAS','CAQUETA','CAUCA','CESAR','CORDOBA','CUNDINAMARCA','CHOCO','HUILA','LA GUAJIRA','MAGDALENA','META','NARIÑO','NORTE DE SANTANDER','QUINDIO','RISARALDA','SANTANDER','SUCRE','TOLIMA','VALLE DEL CAUCA','ARAUCA','CASANARE','PUTUMAYO','AMAZONAS','GUAINIA','GUAVIARE','VAUPES','VICHADA','ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA'
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