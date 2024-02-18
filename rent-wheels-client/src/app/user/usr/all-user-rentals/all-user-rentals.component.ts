import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-user-rentals',
  templateUrl: './all-user-rentals.component.html',
  styleUrls: ['./all-user-rentals.component.css'],
})
export class AllUserRentalsComponent implements OnInit {
  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter();
  rentals: any;
  start_date: string[] = [];
  end_date: string[] = [];
  status: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserFromToken().user_id;
    this.userService.getUserRentals(userId).subscribe((rentals) => {
      this.rentals = rentals;
      this.rentals.forEach((element: any) => {
        let started = this.datePipe.transform(
          element.start_date,
          'MMM d, y, h:mm:ss a'
        );
        let ended = this.datePipe.transform(
          element.end_date,
          'MMM d, y, h:mm:ss a'
        );
        if (started !== null) {
          this.start_date.push(started);
        }
        if (ended !== null) {
          this.end_date.push(ended);
        }
        let now = new Date().getTime();
        let start = new Date(element.start_date).getTime();
        let end = new Date(element.end_date).getTime();
        now < end && now > start
          ? this.status.push('active')
          : this.status.push('not-active');
      });
    });
  }

  goBack() {
    this.goBackEmitter.emit(false);
  }
}
