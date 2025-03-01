import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlacesService} from "../../services/places-service/places.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AnimationLoader, LottieCacheModule, LottieComponent, LottieModule, provideLottieOptions} from "ngx-lottie";
import {AvatarComponent} from "../avatar/avatar.component";
import {AuthService} from "../../services/auth-service/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {ApiResponse} from "../../models/api-response";
import {SubmissionResult} from "../../models/submission-result";
import {Router} from "@angular/router";
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
  submitStatus?:HttpRequestState<ApiResponse<SubmissionResult>>|null;

  constructor(
    public placeService:PlacesService,
    public router:Router,
              public authService:AuthService) {
    this.placeService.loadNextPage();
    this.placeService.getScore();
  }

  submitAns(id: string, selectedOption: string | null) {
    this.makeSubmission(id,selectedOption!);
  }

  makeSubmission(placeId:string,choice:string){
    this.placeService.submitAns({placeId,choice:choice})
      .pipe(httpRequestStates())
      .subscribe((res)=>{
        this.submitStatus=res;
        if(!res.value) return;
        const placeIdx=this.placeService.places.findIndex(place => place.id===res.value!.data!.submission.questionId);
        if(placeIdx<-1) throw Error("Fatal error, this should never happen");
        this.placeService.places[placeIdx].submissionResult=res.value!.data!;
      })
  }

  logout() {
    this.authService.logout()
      .pipe(httpRequestStates())
      .subscribe((res)=>{
        if(res.isLoading) return;
        this.router.navigate(['auth','sign-in'])
      });
  }

  nextQuestion() {
    this.submitStatus=null;
    this.selectedOption=null;
    this.currentPlaceQuestionIndex++;
    this.placeService.getScore();
    if(this.currentPlaceQuestionIndex>=this.placeService.places.length) this.placeService.loadNextPage();
  }
}
