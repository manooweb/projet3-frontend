import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { AuthService } from '../../services/auth.service';
import { FlexModule } from 'ng-flex-layout/flex';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      FlexModule,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      FormsModule,
      ReactiveFormsModule,
      MatCardContent,
      MatFormField,
      MatInput,
      MatIconButton,
      MatSuffix,
      MatIcon,
      MatButton
    ],
    standalone: true
})
export class LoginComponent  {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  public hide = true;
  public onError = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(3)]]
  });

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loginRequest = this.form.value as LoginRequest;
    this.authService.csrf().pipe(
      switchMap(() => this.authService.login(loginRequest)),
      switchMap(() => this.authService.me())
    ).subscribe(
      (user: User) => {
        this.sessionService.logIn(user);
        this.router.navigate(['/rentals'])
      },
      error => this.onError = true
    );
  }
}
