import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SigninComponent} from "./components/signin/signin.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {ReVerifyComponent} from "./components/re-verify/re-verify.component";

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'auth'},
  {path:'home',canActivate: [AuthGuard()],component:HomeComponent},
  {path:'auth',
    component:AuthComponent,
    children:[
      {path:'',pathMatch:'prefix',redirectTo:'sign-up'},
      {path:'sign-up',component:SignupComponent},
      {path:'sign-in',component:SigninComponent},
      {path:'re-verify',component:ReVerifyComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
