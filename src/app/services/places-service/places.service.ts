import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../models/api-response";
import {User} from "../../models/user/user";
import {AuthApi} from "../auth-api";
import {UpdatePassword} from "../../models/update-password";
import {LoginRequest} from "../../models/login-request";
import {RegisterRequest} from "../../models/register-request";
import {ResetPasswordRequest} from "../../models/reset-password-request";
import {HttpRequestState, httpRequestStates} from "ngx-http-request-state";
import {Place} from "../../models/place";
import {Pageable} from "../../models/pageable";
import {PlacesApi} from "../places-api";
import {
  BehaviorSubject,
  catchError,
  debounce,
  debounceTime, EMPTY,
  filter, startWith,
  Subject,
  Subscription,
  switchMap,
  take, tap
} from "rxjs";
import {Submission} from "../../models/submission";
import {SubmissionResult} from "../../models/submission-result";
import {ScoreCard} from "../../models/score-card";

interface PlaceConfig{
  pageSize:number,
  places:Place[],
  totalItems?:number,
  loadNext$:Subject<void>,
  httpState?:{isLoading?:boolean,error?:string}
}

@Injectable()
export class PlacesService implements OnDestroy{
  private subscriptions:Map<String,Subscription> = new Map();
  private placeConfig:PlaceConfig={
    pageSize:20,
    places:[],
    loadNext$:new Subject(),
  }
  scoreStatus?:HttpRequestState<ApiResponse<ScoreCard>>;

  get places(){
    return this.placeConfig.places;
  }

  get isLoading(){
    return this.placeConfig.httpState?.isLoading;
  }

  get isError(){
    return this.placeConfig.httpState?.error;
  }

  loadNextPage(){
    this.placeConfig.loadNext$.next();
    this.placeConfig.loadNext$.subscribe(()=>console.log('loading'))
  }

  constructor(private http: HttpClient) {
    this.init();
  }

  private init(){
    //init on first call
    this.placeConfig.loadNext$.pipe(take(1)).subscribe(()=>{
      const initKey='init-page-subscription';
      if(this.subscriptions.get(initKey)) return;
      this.subscriptions.set(initKey,this.placeConfig.loadNext$
        .pipe(startWith(null),filter(() => this.nextPage()!=null),
          tap(value => this.placeConfig.httpState={isLoading:true}),
          debounceTime(500),switchMap(() => {
            return this.getPaginatedPlaces({pageNo:this.nextPage()!,pageSize:this.placeConfig.pageSize});
          }),
          catchError((err, caught) => {
            this.placeConfig.httpState={error:(err as any).error.message ?? 'failed to load places'};
            return EMPTY;
          }))
        .subscribe((res)=>{
          this.placeConfig={...this.placeConfig,places:this.placeConfig.places.concat(res.data!.data),totalItems:res.data!.totalItems,httpState:undefined}
        }));
    });
  }

  nextPage(){
    if(this.placeConfig.totalItems===undefined) return 1;
    if(this.placeConfig.totalItems===0 || this.placeConfig.totalItems===this.places.length) return null;
    const loadedPageCount=this.placeConfig.places.length/this.placeConfig.pageSize;
    const totalPages=this.placeConfig.totalItems/this.placeConfig.pageSize;
    return loadedPageCount<totalPages ? loadedPageCount+1 : null;
  }

  private getPaginatedPlaces({pageNo,pageSize}: {pageNo:number,pageSize:number}) {
    const url=`${PlacesApi._getPaginatedPlacesInfo}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<ApiResponse<Pageable<Place>>>(url,{withCredentials:true})
  }

  getScore() {
    return this.http.get<ApiResponse<ScoreCard>>(PlacesApi._score,{withCredentials:true})
      .pipe(httpRequestStates())
      .subscribe((res)=>this.scoreStatus=res);
  }


  submitAns({placeId,choice}: {placeId:string,choice:string}) {
    const url=`${PlacesApi._makeSubmission}/${placeId}?choice=${choice}`;
    return this.http.get<ApiResponse<SubmissionResult>>(url,{withCredentials:true});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
