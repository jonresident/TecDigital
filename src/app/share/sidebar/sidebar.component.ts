import { Component, OnInit } from '@angular/core';
import { IndicadorUnoDetail } from 'src/app/dashboard/indicadores/indicadores.models';
import { IndicadorUnoComponent } from 'src/app/dashboard/indicadores/indicadorUno/indicador-uno.component';
import { SidebarService } from './sidebar.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  deptoFilter = null;
  dateInitFilter = null;
  dateFinFilter = null;
  aFiltrosSeleccionados = [];

  aArray2 = [
    'ANTIOQUIA', 'ATLANTICO', 'SANTAFE DE BOGOTA D.C', 'BOLIVAR', 'BOYACA', 'CALDAS', 'CAQUETA', 'CAUCA', 'CESAR', 'CORDOBA', 'CUNDINAMARCA', 'CHOCO', 'HUILA', 'LA GUAJIRA', 'MAGDALENA', 'META', 'NARIÑO', 'NORTE DE SANTANDER', 'QUINDIO', 'RISARALDA', 'SANTANDER', 'SUCRE', 'TOLIMA', 'VALLE DEL CAUCA', 'ARAUCA', 'CASANARE', 'PUTUMAYO', 'AMAZONAS', 'GUAINIA', 'GUAVIARE', 'VAUPES', 'VICHADA', 'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA'
  ];

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
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
  }

  aplicarFiltros() {

    /* let datosBeneficiarios: IndicadorUnoDetail = this.sidebarService.dataUno;

    let datosFiltrados: IndicadorUnoDetail = {
      faseDiagnostico : datosBeneficiarios.faseDiagnostico,
      faseMapeo : datosBeneficiarios.faseMapeo,
      faseEvaluacion : datosBeneficiarios.faseEvaluacion,
      faseConsolidacion : datosBeneficiarios.faseConsolidacion,
      faseDespegue: datosBeneficiarios.faseDespegue,
      nivel_1_basicas: datosBeneficiarios.nivel_1_basicas,
      nivel_2_basicas: datosBeneficiarios.nivel_1_basicas,
      nivel_3_basicas: datosBeneficiarios.nivel_3_basicas,
      nivel_4_basicas: datosBeneficiarios.nivel_4_basicas,
      nivel_1_avanzadas: datosBeneficiarios.nivel_1_avanzadas,
      nivel_2_avanzadas: datosBeneficiarios.nivel_2_avanzadas,
      nivel_3_avanzadas: datosBeneficiarios.nivel_3_avanzadas,
      nivel_4_avanzadas: datosBeneficiarios.nivel_4_avanzadas,
      beneficiario_departamento: this.deptoFilter !== null ? null : datosBeneficiarios.beneficiario_departamento,
      tabla : {
        NombreEmpresa: ["Emp1"],
        Direccion: ["dir1"],
        Departamento : ["info 1"],
        Telefono : ["info 1"],
        CorreoElectronico : ["info 1"],
        NombresRepresentanteLegal : ["info 1"],
        ApellidosRepresentanteLegal : ["info 1"],
        NombresPersonaEncargadaProceso : ["info 1"],
        ApellidosPersonaE : ["info 1"],
        CorreoElectronicoPersonaEncargadaProceso : ["info 1"],
        TelefonoPersonaEncargadaProceso : ["info 1"],
        SitioWeb : ["info 1"],
        categoria : ["info 1"],
        TamanoEmpresa : ["info 1"],
        FechaFinDatosBasicos: [new Date("01-01-2020")]
      }
    } */

    let body = {
      "idUser": sessionStorage.getItem('id'),
      "fecha": this.dateFinFilter !== null ? this.dateFinFilter : new Date().toISOString().substr(0,10),
      "departamento": this.deptoFilter !== null ? this.deptoFilter : "todos"
    };

    this.sidebarService.filterData$.emit(body);
  }

}