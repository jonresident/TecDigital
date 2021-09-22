import { ThisReceiver } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { EmpresasService } from './dashboard/empresas/empresas.service';
import { UsuariosService } from './dashboard/usuarios/usuarios.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(
    private empresasService: EmpresasService,
    private usuariosService: UsuariosService
  ) {
  }

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) {
      if (this.empresasService.activo){
        this.empresasService.numeroEmpresas$.emit(value.length);
      }else if (this.usuariosService.activo){
        this.usuariosService.numeroUsuarios$.emit(value.length);
      }
      return value;
    }

    args = args.toLowerCase();

    let retorno = value.filter(function(item: any) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(args);
    });

    if (this.empresasService.activo){
      this.empresasService.numeroEmpresas$.emit(retorno.length);
    }else if (this.usuariosService.activo){
      this.usuariosService.numeroUsuarios$.emit(retorno.length);
    }
    
    return retorno;
  }
}
