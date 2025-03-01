import {Component, Inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service/auth.service";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpRequestState} from "ngx-http-request-state";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../models/dialog-data";
import {OtpFor} from "../../models/otp-for";

@Component({
  standalone: true,
  selector: 'gt-otp',
  templateUrl: './otp.component.html',
  imports: [
    MatInputModule,
    NgForOf,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  otpForm = this.fb.array(
    Array.from({ length: 6 }).map(() =>
      this.fb.control('', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('[0-9]') // Ensures only numeric values (0-9)
      ])
    )
  );
  otpSubmitStatus?:HttpRequestState<void>;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogData,
    private dialogRef:MatDialogRef<OtpComponent>,
    private fb:FormBuilder,
              private authService:AuthService) {}

  onInputChange(event: any, index: number) {
    let input = event.target;
    let value = input.value;
    this.otpForm.controls[index].setValue(value[value.length-1]);
  }

  handleOtp() {
    throw new Error("Unhandled otp");
  }
}
