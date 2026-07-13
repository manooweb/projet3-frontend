import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { User } from 'src/app/interfaces/user.interface';
import { FlexModule } from 'ng-flex-layout/flex';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
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
      MatButton
    ],
    standalone: true
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private sessionService = inject(SessionService);


  public onError = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required, Validators.min(3)]]
  });

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const registerRequest = this.form.value as RegisterRequest;
    this.authService.csrf().pipe(
      switchMap(() => this.authService.register(registerRequest)),
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
