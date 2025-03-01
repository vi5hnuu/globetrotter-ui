import {catchError, map, Observable, pipe, retry, tap, timer} from "rxjs";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { inject } from "@angular/core";
import {AuthService} from "../services/auth-service/auth.service";
import {httpRequestStates} from "ngx-http-request-state";

//INFO :: if no config is passed the auth lib redirect to original url(the url intercepted by guard)
export const AuthGuard = (): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService=inject(AuthService);
    const router=inject(Router);
    return new Promise((resolve,reject) => {
      inject(AuthService)
        .getMeInfo()
        .pipe(httpRequestStates(),retry(2))
        .subscribe((response) => {
          authService.userInfo=response;
          if(response.value) return resolve(true);
          if(response.error)return resolve(router.navigate(['/auth/sign-in']));
        })
    });
  };
};
