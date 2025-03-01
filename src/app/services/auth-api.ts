import {environment} from "../../../environments/environment";

export class AuthApi {
  static _getMeInfo = `${environment.baseUrl}/users/me`; //GET
  static _deleteMe = `${environment.baseUrl}/users`; //DELETE
  static _updatePasswordInit = `${environment.baseUrl}/users/password/init`; //POST
  static _updatePasswordComplete = `${environment.baseUrl}/users/password/complete`; //PATCH
  static _login = `${environment.baseUrl}/users/login`; //POST
  static _logout = `${environment.baseUrl}/users/logout`; //GET
  static _register = `${environment.baseUrl}/users/register`; //POST
  static _reVerify = `${environment.baseUrl}/users/re-verify`; //GET
  static _forgotPassword = `${environment.baseUrl}/users/forgot-password`; //POST
  static _resetPassword = `${environment.baseUrl}/users/reset-password`; //POST
}
