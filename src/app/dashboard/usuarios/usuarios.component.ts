import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {PaginationInstance} from 'ngx-pagination/dist/ngx-pagination.module';
import { from, Observable, Subscription } from 'rxjs';
import { BodyCrearUsuario, Roles, Usuario, BodyActualizarUsuario, validateEmailFn } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {


  formCreateUser: FormGroup;

  users$: Observable<Usuario[]>;
  usersSubs = new Subscription();
  users: Usuario[] = [];

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

  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
      this.config.currentPage = number;
  }


  listUsers() {
    this.users$ = from(this.usuariosService.getUsers());
    this.usersSubs = this.users$.subscribe(u => {
      this.users = u.map(us => {
        let date_joined = new Date(us.date_joined);
        let last_login = new Date(us.last_login != null ? us.last_login : us.date_joined);
        
        return {...us, date_joined: date_joined, last_login: last_login}
      });
      this.sort('date_joined');
    }, err => {
      this.users = [];
    });
  }

  formCreateUserInit() {
    this.formCreateUser = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      first_name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(254)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(128), Validators.minLength(8)]),
      confirmPassword: new FormControl(null),
      rol: new FormControl(null, [Validators.required])
    }, {
      validators: [this.checkPasswords, this.validateEmail]
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  validateEmail: ValidatorFn = (group: AbstractControl): ValidationErrors | null  => {
    const email = group.get('email').value;
    return validateEmailFn(email) ? null : { failEmail: true };
  }

}
