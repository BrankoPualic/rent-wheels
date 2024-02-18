import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-user-reviews',
  templateUrl: './all-user-reviews.component.html',
  styleUrls: ['./all-user-reviews.component.css'],
})
export class AllUserReviewsComponent implements OnInit {
  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter();
  reviews: any[] = [];
  iterations: number[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserFromToken().user_id;
    this.userService.getUserReviews(userId).subscribe((reviews) => {
      this.reviews = reviews;

      this.reviews.forEach((element: any) => {
        this.iterations.push(element.rating);
      });
    });
  }

  getStarsArray(starCount: number): any[] {
    return Array(starCount).fill(0);
  }

  transformDate(dateString: string) {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'MMM yyyy');
  }

  goBack() {
    this.goBackEmitter.emit(false);
  }
}
