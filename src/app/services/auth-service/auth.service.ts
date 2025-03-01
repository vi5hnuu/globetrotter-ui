import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../models/api-response";
import {User} from "../../models/user/user";
import {AuthApi} from "../auth-api";
import {UpdatePassword} from "../../models/update-password";
import {LoginRequest} from "../../models/login-request";
import {RegisterRequest} from "../../models/register-request";
import {ResetPasswordRequest} from "../../models/reset-password-request";
import {HttpRequestState} from "ngx-http-request-state";

@Injectable()
export class AuthService {
  userInfo?:HttpRequestState<ApiResponse<User>>;
  constructor(private http: HttpClient) {
  }


  getMeInfo() {
    return this.http.get<ApiResponse<User>>(AuthApi._getMeInfo,{withCredentials:true});
  }

  deleteMe() {
    return this.http.delete<ApiResponse<void>>(AuthApi._deleteMe,{withCredentials:true});
  }

  updatePasswordInit({usernameEmail}: { usernameEmail: string }) {
    return this.http.post<ApiResponse<void>>(AuthApi._updatePasswordInit, {'usernameEmail': usernameEmail},{withCredentials:true})
  }

  updatePasswordComplete({updatePassword}: { updatePassword: UpdatePassword }) {
    return this.http.patch<ApiResponse<void>>(AuthApi._updatePasswordComplete, updatePassword,{withCredentials:true})
  }

  login({login}: { login: LoginRequest }) {
    return this.http.post<ApiResponse<User>>(AuthApi._login, login,{withCredentials:true})
  }

  logout() {
    return this.http.get<ApiResponse<void>>(AuthApi._logout,{withCredentials:true});
  }

  register({register}: { register: RegisterRequest }) {
    return this.http.post<ApiResponse<void>>(AuthApi._register, register)
  }

  reVerify({email}: { email: string }) {
    return this.http.post<ApiResponse<void>>(`${AuthApi._reVerify}?email=${email}`, email)
  }

  forgotPassword({usernameEmail}: { usernameEmail: string }) {
    return this.http.post<ApiResponse<void>>(AuthApi._forgotPassword, {usernameEmail})
  }

  resetPassword({resetPassword}: { resetPassword: ResetPasswordRequest }) {
    return this.http.post<ApiResponse<void>>(AuthApi._resetPassword, resetPassword,{withCredentials:true})
  }
}
