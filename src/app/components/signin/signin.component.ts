import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {ApiResponse} from "../../models/api-response";
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "../../services/utility-service/utility.service";
import {RegisterRequest} from "../../models/register-request";
import {SnackbarType} from "../../modals/snackbar-data";
import {User} from "../../models/user/user";
import {LoginRequest} from "../../models/login-request";

@Component({
    standalone: true,
    selector: 'gt-signin',
    templateUrl: './signin.component.html',
    imports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        NgIf,
        ReactiveFormsModule
    ],
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signinForm=this.fb.group({
    usernameEmail: ['', [Validators.required,Validators.minLength(5)]],
    password: ['', [Validators.required,Validators.minLength(7)]],
  });
  signinStatus?:HttpRequestState<ApiResponse<User>>;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private utilityService:UtilityService) {
  }

  login() {
    this.authService.login({login:this.signinForm.value as LoginRequest})
      .pipe(httpRequestStates())
      .subscribe((response: HttpRequestState<ApiResponse<User>>) => {
        this.signinStatus=response;
        if(this.signinStatus.error) this.utilityService.openDefaultSnackbar({data:{text:(this.signinStatus.error as any)?.error?.message ?? 'Failed to login, please try again',type:SnackbarType.ERROR}});
        if(!this.signinStatus.value) return;
        this.utilityService.openDefaultSnackbar({data:{text:this.signinStatus.value.message ?? 'logged in successfully',type:SnackbarType.SUCCESS}})
        this.router.navigate(['home'])
      })
  }
}
