import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActivatedRouteSnapshot, RouterModule} from "@angular/router";
import {AuthService} from "./services/auth-service/auth.service";
import {UtilityService} from "./services/utility-service/utility.service";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import player from 'lottie-web';
import {LottieModule} from "ngx-lottie";
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    LottieModule.forRoot({player: playerFactory}),
  ],
  providers: [AuthService,UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
