import { Injectable, inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { AuthService } from "../features/auth/services/auth.service";
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class AuthGuard  {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sessionService = inject(SessionService);


  public canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.sessionService.isLogged) {
      return true;
    }

    return this.authService.me().pipe(
      map(user => {
        this.sessionService.logIn(user);
        return true;
      }),
      catchError(() => of(this.router.createUrlTree(['login'])))
    );
  }
}
