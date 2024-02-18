import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css'],
})
export class UserInfosComponent implements OnInit {
  @Output() openAllReviews: EventEmitter<boolean> = new EventEmitter(false);
  @Output() openAllRentals: EventEmitter<boolean> = new EventEmitter(false);
  user: any;
  register_date: string | null;
  avg_rating: number = 0;
  hasRental: boolean = false;
  hasReviews: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const user_id = this.authService.getUserFromToken().user_id;
    this.userService.userProfile(user_id).subscribe((user) => {
      this.user = user;
      this.register_date = this.datePipe.transform(
        this.user.register_date,
        'MMMM d, y'
      );
      const avg = +this.user.avg_rating;
      const avgFormatted = avg.toFixed(2);
      this.avg_rating = +avgFormatted;
      if (this.user.reviews > 0) {
        this.hasReviews = true;
      }
    });

    this.userService.hasRental$.subscribe((value) => {
      this.hasRental = value;
    });
  }

  openAllUserReviews() {
    this.openAllReviews.emit(true);
  }
  openAllUserRentals() {
    this.openAllRentals.emit(true);
  }
}
