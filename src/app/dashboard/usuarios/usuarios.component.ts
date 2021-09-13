import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { from, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PreloadService } from '../dashboard.service';
import { Usuario, BodyCambiarPassword, BodyActualizarUsuario, validateEmailFn, Roles, BodyCrearUsuario } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  enumRoles = Roles;
  usuariosSubscription = new Subscription();
  changePassSubscription = new Subscription();
  editSubscription = new Subscription();
  createSubscription = new Subscription();
  usuarios: any = [];
  editIsActive: boolean = true;
  newIsActive: boolean = true;

  formChangePassword: FormGroup;
  formEditUser: FormGroup;
  formCreateUser: FormGroup;

  selectedUser: Usuario = {
    id: "",
    first_name: "",
    username: "",
    email: "",
    rol: "",
    last_login: new Date(),
    date_joined: new Date,
    is_active: true,
    is_superuser: false
  };


  users$: Observable<Usuario[]>;
  usersSubs = new Subscription();
  users: Usuario[] = [];

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
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
    this.formChangePasswordInit();
    this.formEditUserInit(null, null, null, null);
    this.formCreateUserInit();
  }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
    this.changePassSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
    this.createSubscription.unsubscribe();
  }


  obtenerDatos() {
    this.usuariosSubscription = this.usuariosService.getUsuarios().subscribe({
      next: (resp: any) => {
        let registro = {};
        let registros = [];

        for (let i = 0; i < resp.length; i++) {
          registro = {
            id: resp[i].id,
            first_name: resp[i].first_name,
            username: resp[i].username,
            email: resp[i].email,
            rol: resp[i].rol,
            is_active: resp[i].is_active,
            date_joined: resp[i].date_joined,
            last_login: resp[i].last_login
          }

          registros.push(Object.assign({}, registro));
        }

        this.usuarios = registros;

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
  }

  initEditUserModal(user: Usuario) {
    this.selectedUser = user;
    this.editIsActive = user.is_active;
    this.formEditUserInit(user.username, user.first_name, user.email, user.rol);
  }

  formEditUserInit(username: string, first_name: string, email: string, rol: string) {
    this.formEditUser = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.maxLength(150)]),
      first_name: new FormControl(first_name, [Validators.required, Validators.maxLength(30)]),
      email: new FormControl(email, [Validators.required, Validators.maxLength(254)]),
      rol: new FormControl(rol, [Validators.required])
    }, {
      validators: [this.validateEmail]
    });
  }

  changeActiveUser(state: boolean) {
    this.editIsActive = state;
  }

  editUser(values: BodyActualizarUsuario) {
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    const bodyEdit = { ...values, is_active: this.editIsActive, id: this.selectedUser.id };
    this.editSubscription = this.usuariosService.editUser(bodyEdit).subscribe({
      next: (resp: any) => {
        setTimeout(() => {
          this.preloadService.cargando$.emit(false);
        });
        $('#modalEditUser').modal('hide');
        if (resp.ok !== null) {
          Swal.fire({
            icon: 'info',
            title: 'Actualización exitosa',
            text: "Se ha editado exitosamente el usuario seleccionado"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Se está ocasionando un error desconocido en la edición de usuarios. contacte a soporte"
          });
        }
        this.usuariosSubscription.unsubscribe();
        this.obtenerDatos();
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
  }

  initChangePasswordModal(user: Usuario) {
    this.selectedUser = user;
    this.formChangePasswordInit();
  }

  formChangePasswordInit() {
    this.formChangePassword = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.maxLength(128), Validators.minLength(8)]),
      confirmPassword: new FormControl(null),
    }, {
      validators: [this.checkPasswords]
    });
  }

  changePassword(values: { password: string, confirmPassword: string }) {
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    const body: BodyCambiarPassword = {
      id: this.selectedUser.id,
      username: this.selectedUser.username,
      password1: values.password,
      password2: values.confirmPassword
    };

    this.changePassSubscription = this.usuariosService.cambiarPassword(body).subscribe({
      next: (resp: any) => {
        if (resp.ok !== null) {
          Swal.fire({
            icon: 'info',
            title: 'Cambio exitoso',
            text: "Se ha cambiado exitosamente la contraseña"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Se está ocasionando un error desconocido en el cambio de contraseña"
          });
        }
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

  changeActiveNew(state: boolean) {
    this.newIsActive = state;
  }

  createUser(values: BodyCrearUsuario) {
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    const bodyUser = { ...values, is_active: this.newIsActive };
    this.createSubscription = this.usuariosService.createUser(bodyUser).subscribe({
      next: (resp: any) => {
        setTimeout(() => {
          this.preloadService.cargando$.emit(false);
        });
        $('#modalAddEditUser').modal('hide');
        if (resp.id !== null) {
          Swal.fire({
            icon: 'info',
            title: 'Guardado exitoso',
            text: "Se ha creado exitosamente un nuevo usuario"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Se está ocasionando un error desconocido en la creación de usuarios. contacte a soporte"
          });
        }
        this.usuariosSubscription.unsubscribe();
        this.obtenerDatos();
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
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  validateEmail: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const email = group.get('email').value;
    return validateEmailFn(email) ? null : { failEmail: true };
  }

}
