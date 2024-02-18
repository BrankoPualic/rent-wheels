import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-latest-rental',
  templateUrl: './latest-rental.component.html',
  styleUrls: ['./latest-rental.component.css'],
})
export class LatestRentalComponent implements OnInit {
  rental: any;
  start_date: string | null;
  end_date: string | null;
  status: string;
  thereIsRental: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const user_id = this.authService.getUserFromToken().user_id;
    this.userService.getLatestUserRental(user_id).subscribe((response) => {
      if (!response.hasOwnProperty('message')) {
        this.thereIsRental = true;
        this.rental = response;
        this.start_date = this.datePipe.transform(
          this.rental.start_date,
          'MMM d, y, h:mm:ss a'
        );
        this.end_date = this.datePipe.transform(
          this.rental.end_date,
          'MMM d, y, h:mm:ss a'
        );
        const now = new Date().getTime();
        const start = new Date(this.rental.start_date).getTime();
        const end = new Date(this.rental.end_date).getTime();
        now < end && now > start
          ? (this.status = 'active')
          : (this.status = 'not-active');

        this.userService.setHasRental(true);
      }
    });
  }
}
