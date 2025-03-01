import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarComponent} from "../avatar/avatar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {ApiResponse} from "../../models/api-response";
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "../../services/utility-service/utility.service";
import {SnackbarType} from "../../modals/snackbar-data";

@Component({
  selector: 'gt-re-verify',
  standalone: true,
    imports: [CommonModule, AvatarComponent, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './re-verify.component.html',
  styleUrls: ['./re-verify.component.scss']
})
export class ReVerifyComponent {
  email=this.fb.nonNullable.control('',[Validators.required,Validators.email]);
  reverifyStatus?:HttpRequestState<ApiResponse<void>>;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private utilityService:UtilityService) {
  }

  onReVerify() {
    this.authService.reVerify({email:this.email.value})
      .pipe(httpRequestStates())
      .subscribe((res)=>{
        this.reverifyStatus=res;
        if(res.error){
          this.utilityService.openDefaultSnackbar({data:{text:(res.error as any)?.error?.message ?? 'failed to verify',type:SnackbarType.ERROR}});
        }
        if(!res.value) return;
        this.utilityService.openDefaultSnackbar({data:{text:res.value.message!,type:SnackbarType.ERROR}});
        this.router.navigate(['..','sign-in'],{relativeTo:this.activatedRoute});
      })
  }
}
