import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-owner-info',
    templateUrl: './owner-info.component.html',
    styleUrls: ['./owner-info.component.scss'],
    standalone: true
})
export class OwnerInfoComponent implements OnChanges {
  private userService = inject(UserService);


  @Input()
  public ownerId!: number;

  public name: string | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['ownerId'].currentValue !== changes['ownerId'].previousValue) {
      this.userService
        .getUserById(changes['ownerId'].currentValue)
        .subscribe((user: User) => this.name = user.name);
    }



  }
}
