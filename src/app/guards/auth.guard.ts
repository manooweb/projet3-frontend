import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class AuthGuard  {
  private router = inject(Router);
  private sessionService = inject(SessionService);


  public canActivate(): boolean {
    if (!this.sessionService.isLogged) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}