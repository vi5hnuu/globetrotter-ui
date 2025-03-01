import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth-service/auth.service";
import {RegisterRequest} from "../../models/register-request";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {ApiResponse} from "../../models/api-response";
import {UtilityService} from "../../services/utility-service/utility.service";
import {Router} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  standalone: true,
  selector: 'gt-signup',
  templateUrl: './signup.component.html',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm=this.fb.group({
    firstName: ['', Validators.required],
    lastName:[ ''],
    userName: ['', [Validators.required,Validators.minLength(5)]],
    email: ['', [Validators.required,Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)],],
    password: ['', [Validators.required,Validators.minLength(7)]],
  });
  signupStatus?:HttpRequestState<ApiResponse<void>>;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private utilityService:UtilityService) {
  }

  registerUser() {
    this.authService.register({register:this.signupForm.value as RegisterRequest})
      .pipe(httpRequestStates())
      .subscribe((response: HttpRequestState<ApiResponse<void>>) => {
        this.signupStatus=response;
        console.log((this.signupStatus.error as any))
        if(this.signupStatus.error) this.utilityService.openSnackBar((this.signupStatus.error as any)?.error?.message ?? 'Failed to register, please try again',"ok");
        if(!this.signupStatus.value) return;
        this.utilityService.openSnackBar(this.signupStatus.value.message ?? 'Please check your email',"ok")
        this.router.navigate(['..','sign-in']);
      })
  }
}
