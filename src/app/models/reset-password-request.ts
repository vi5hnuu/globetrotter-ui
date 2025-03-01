export interface ResetPasswordRequest {
     usernameEmail:string;//autofill this in frontend with username or email used for forgot-password
     otp:string;
     password:string;
     confirmPassword:string;
}
