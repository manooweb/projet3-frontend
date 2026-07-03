import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { RentalsService } from '../../services/rentals.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardImage, MatCardContent, MatCardActions } from '@angular/material/card';
import { FlexModule } from 'ng-flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { OwnerInfoComponent } from '../../../../shared/components/owner-info/owner-info.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    imports: [MatCard, MatCardHeader, FlexModule, MatCardTitle, MatButton, RouterLink, MatIcon, MatCardSubtitle, OwnerInfoComponent, MatCardImage, MatCardContent, MatCardActions, AsyncPipe]
})
export class ListComponent {
  private sessionService = inject(SessionService);
  private rentalsService = inject(RentalsService);


  public rentals$ = this.rentalsService.all();

  get user(): User | undefined {
    return this.sessionService.user;
  }
}
