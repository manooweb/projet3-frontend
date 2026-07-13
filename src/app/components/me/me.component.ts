import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FlexModule } from 'ng-flex-layout/flex';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.scss'],
    imports: [MatCard, MatCardTitle, FlexModule, MatIconButton, MatIcon, MatCardContent],
    standalone: true
})
export class MeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);


  public user: User | undefined;

  public ngOnInit(): void {
    this.authService.me().subscribe(
      (user: User) => this.user = user,
      () => this.router.navigate(['login'])
    )
  }

  public back() {
    window.history.back();
  }

}
