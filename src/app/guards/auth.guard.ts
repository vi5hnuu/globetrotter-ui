import {catchError, map, Observable, pipe, retry, tap, timer} from "rxjs";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { inject } from "@angular/core";
import {AuthService} from "../services/auth-service/auth.service";
import {httpRequestStates} from "ngx-http-request-state";
import {CHALLENGE_TO} from "../models/common-consts";

//INFO :: if no config is passed the auth lib redirect to original url(the url intercepted by guard)
export const AuthGuard = (): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService=inject(AuthService);
    const router=inject(Router);
    const challengeToUsername=route.queryParamMap.get(CHALLENGE_TO);
    return new Promise((resolve,reject) => {
      inject(AuthService)
        .getMeInfo()
        .pipe(httpRequestStates(),retry(2))
        .subscribe((response) => {
          authService.userInfo=response;
          if(response.value) {
            localStorage.removeItem(CHALLENGE_TO)
            return resolve(true);
          }
          if(response.error) {
            if(challengeToUsername) localStorage.setItem(CHALLENGE_TO,challengeToUsername);
            return resolve(router.navigate(['/auth/sign-in']))
          };
        })
    });
  };
};
