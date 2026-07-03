import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/features/rentals/interfaces/rental.interface';
import { SessionService } from 'src/app/services/session.service';
import { MessageRequest } from '../../interfaces/api/messageRequest.interface';
import { MessageResponse } from '../../interfaces/api/messageResponse.interface';
import { MessagesService } from '../../services/messages.service';
import { RentalsService } from '../../services/rentals.service';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { FlexModule } from 'ng-flex-layout/flex';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OwnerInfoComponent } from '../../../../shared/components/owner-info/owner-info.component';
import { MatInput } from '@angular/material/input';
import { TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    imports: [MatCard, MatCardTitle, FlexModule, MatIconButton, MatIcon, MatCardSubtitle, OwnerInfoComponent, MatCardContent, FormsModule, ReactiveFormsModule, MatInput, MatButton, TitleCasePipe, CurrencyPipe, DatePipe]
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private messagesService = inject(MessagesService);
  private rentalsService = inject(RentalsService);
  private sessionService = inject(SessionService);
  private matSnackBar = inject(MatSnackBar);


  public messageForm!: FormGroup;
  public rental: Rental | undefined;

  constructor() {
    this.initMessageForm();
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!

    this.rentalsService
      .detail(id)
      .subscribe((rental: Rental) => this.rental = rental);
  }

  public back() {
    window.history.back();
  }

  public sendMessage(): void {
    const message = {
      rental_id: this.rental!.id,
      user_id: this.sessionService.user?.id,
      message: this.messageForm.value.message
    } as MessageRequest;

    this.messagesService.send(message).subscribe(
      (messageResponse: MessageResponse) => {
        this.initMessageForm();
        this.matSnackBar.open(messageResponse.message, "Close", { duration: 3000 });
      });
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.min(10)]],
    });
  }

}
