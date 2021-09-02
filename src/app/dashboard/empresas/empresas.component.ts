import { Component, OnInit } from '@angular/core';
import {PaginationInstance} from 'ngx-pagination/dist/ngx-pagination.module';
declare var $: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent implements OnInit {

  datos = [
    {
      "Usuario":"Jothas",
      "Nombre": "Jonathan",
      "Apellido": "Ospina Garcia",
      "Correo": "jonresident@hotmail.com",
      "Entidad": "Sura",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Clau",
      "Nombre": "Claudia Natalia",
      "Apellido": "Ospina Garcia",
      "Correo": "claudia@hotmail.com",
      "Entidad": "Sura",
      "Rol": "HMO",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Mau",
      "Nombre": "Mauricio",
      "Apellido": "Ospina Garcia",
      "Correo": "mauro@hotmail.com",
      "Entidad": "Sura",
      "Rol": "HMO",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Carlitos",
      "Nombre": "Carlos",
      "Apellido": "Ospina Garcia",
      "Correo": "carlos@hotmail.com",
      "Entidad": "Sanitas",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Rubi",
      "Nombre": "Rubiela",
      "Apellido": "Ospina Garcia",
      "Correo": "rubiela@hotmail.com",
      "Entidad": "Sanitas",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Yake",
      "Nombre": "Yakeline",
      "Apellido": "Ospina Garcia",
      "Correo": "yake@hotmail.com",
      "Entidad": "Nueva Eps",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Eulo",
      "Nombre": "Eulogia",
      "Apellido": "Ospina Garcia",
      "Correo": "eulogia@hotmail.com",
      "Entidad": "Sura",
      "Rol": "Visitante",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Pau",
      "Nombre": "Paulo",
      "Apellido": "Ospina Garcia",
      "Correo": "paulo@hotmail.com",
      "Entidad": "Sura",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Andresito",
      "Nombre": "Andres",
      "Apellido": "Ospina Garcia",
      "Correo": "andreso@hotmail.com",
      "Entidad": "Salud total",
      "Rol": "HMO",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    },
    {
      "Usuario":"Davide",
      "Nombre": "David",
      "Apellido": "Ospina Garcia",
      "Correo": "david@hotmail.com",
      "Entidad": "Sura",
      "Rol": "Administrador",
      "Registro": "Fecha de Registro",
      "Ingreso": "Fecha ultimo ingreso"
    }
  ];

  key: string = 'Usuario';
  reverse: boolean = false;
  sort(key){
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

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
      this.config.currentPage = number;
  }

}
