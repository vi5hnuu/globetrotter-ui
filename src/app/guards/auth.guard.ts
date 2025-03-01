import { catchError, map, Observable, retry, tap, timer } from "rxjs";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { inject } from "@angular/core";
import {AuthService} from "../services/auth-service/auth.service";

//INFO :: if no config is passed the auth lib redirect to original url(the url intercepted by guard)
export const AuthGuard = (): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService=inject(AuthService);
    const router=inject(Router);
    return inject(AuthService)
      .getMeInfo()
      .pipe(
        map(res=>{
          authService.userInfo=res;
          return true;
        }),retry(2),
        catchError((err) => router.navigate(['auth','sign-up'])),
      );
  };
};
