import {Component, OnDestroy} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {PlacesService} from "../../services/places-service/places.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AnimationLoader, LottieCacheModule, LottieComponent, LottieModule, provideLottieOptions} from "ngx-lottie";
import {AvatarComponent} from "../avatar/avatar.component";
import {AuthService} from "../../services/auth-service/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {ApiResponse} from "../../models/api-response";
import {SubmissionResult} from "../../models/submission-result";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CHALLENGE_TO} from "../../models/common-consts";
import {ScoreCard} from "../../models/score-card";

// @ts-ignore
@Component({
  selector: 'gt-home',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, LottieComponent, AvatarComponent, MatButtonModule],
  providers: [PlacesService, provideLottieOptions({
    player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
  }),
    AnimationLoader,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  private subscriptions: Subscription[] = [];
  currentPlaceQuestionIndex: number = 0;
  selectedOption?: string | null;
  submitStatus?: HttpRequestState<ApiResponse<SubmissionResult>> | null;
  challengeToUsername?: string|null;
  _opponentScoreInterval?:any;
  resetStatus?:HttpRequestState<ApiResponse<ScoreCard>>;

  constructor(
    public placeService: PlacesService,
    public router: Router,
    public location:Location,
    public activatedRoute:ActivatedRoute,
    public authService: AuthService) {
    this.placeService.loadNextPage();
    this.placeService.getMyScore();

    this.subscriptions.push(this.activatedRoute.queryParamMap.subscribe((params)=>{
      this.challengeToUsername = params.get(CHALLENGE_TO);
      if(!this.challengeToUsername) return;
      clearInterval(this._opponentScoreInterval);
      this._opponentScoreInterval=setInterval(()=>{
        if(!this.challengeToUsername) clearInterval(this._opponentScoreInterval);
        else this.placeService.getOpponentScore(this.challengeToUsername)
      },5000)
    }));
  }

  submitAns(id: string, selectedOption: string | null) {
    this.makeSubmission(id, selectedOption!);
  }

  makeSubmission(placeId: string, choice: string) {
    this.placeService.submitAns({placeId, choice: choice})
      .pipe(httpRequestStates())
      .subscribe((res) => {
        this.submitStatus = res;
        if (!res.value) return;
        const placeIdx = this.placeService.places.findIndex(place => place.id === res.value!.data!.submission.questionId);
        if (placeIdx < -1) throw Error("Fatal error, this should never happen");
        this.placeService.places[placeIdx].submissionResult = res.value!.data!;
      })
  }

  resetGame(){
    this.placeService.resetGame()
      .pipe(httpRequestStates())
      .subscribe((res) => {
        this.resetStatus=res;
        if(!res.value) return;
        window.location.href = this.location.path(true);
        // this.router.navigate(['.'],{relativeTo:this.activatedRoute});
      })
  }

  logout() {
    this.authService.logout()
      .pipe(httpRequestStates())
      .subscribe((res) => {
        if (res.isLoading) return;
        this.router.navigate(['auth', 'sign-in'])
      });
  }

  nextQuestion() {
    this.submitStatus = null;
    this.selectedOption = null;
    this.currentPlaceQuestionIndex++;
    this.placeService.getMyScore();
    if (this.currentPlaceQuestionIndex >= this.placeService.places.length) this.placeService.loadNextPage();
  }

  shareOnWhatsApp() {
    const cleanUrl = `${window.location.origin}${window.location.pathname}/#/home?${CHALLENGE_TO}=${this.authService.userInfo!.value!.data!.username}`;
    const url = encodeURIComponent(cleanUrl);
    const text = encodeURIComponent('Hey, check out this link:');
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this._opponentScoreInterval);
  }
}
