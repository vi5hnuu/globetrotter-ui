import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlacesService} from "../../services/places-service/places.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AnimationLoader, LottieCacheModule, LottieComponent, LottieModule, provideLottieOptions} from "ngx-lottie";
import {AvatarComponent} from "../avatar/avatar.component";
import {AuthService} from "../../services/auth-service/auth.service";
import {MatButtonModule} from "@angular/material/button";
// @ts-ignore
@Component({
  selector: 'gt-home',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, LottieComponent, AvatarComponent, MatButtonModule],
  providers:[PlacesService,provideLottieOptions({
    player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
  }),
    AnimationLoader,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentPlaceQuestionIndex: number = 0;
  selectedOption?:string|null;

  constructor(public placeService:PlacesService,public authService:AuthService) {
    this.placeService.loadNextPage();
  }

  submitAns(id: string, selectedOption: string | null) {
    this.placeService.makeSubmission(id,selectedOption!);
  }
}
