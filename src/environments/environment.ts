// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  /* apiBeneficiarias: 'http://localhost:8000/api/resultados/data_beneficiarias/',
  apiOferentes: 'http://localhost:8000/api/resultados/data_oferentes/' */
  /*apiBeneficiarias: 'http://localhost:3000/data_beneficiarias',
  apiOferentes: 'http://localhost:3000/data_oferentes'*/

  api: 'http://localhost:7000/api/',
  apiResultados: 'resultados/',
  apiBeneficiarias: 'data_beneficiarias/',
  apiOferentes: 'data_oferentes/',
  apiLeads: 'data_leads/',
  apiLogin: 'login/',
  apiUsuarios: 'usuarios/',
  apiCrearUsuario: 'create_user/',
  apiActualizarUsuario: 'update_user/',
  apiListarUsuarios: 'list_user/',
  apiCambiarPassword: 'change_password/',
  apiResetPassword: 'reset_password/',
  apiResponseResetPassword: 'response_reset_password/',
  apiToken: 'token/',
  apiVerificarTokenAcceso: 'verify/',
  apiActualizarToken: 'token-refresh/'
 
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
