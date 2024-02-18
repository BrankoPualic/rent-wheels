import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css'],
})
export class PostReviewComponent implements OnInit {
  @Output() closeReviewModalEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() carId: number;
  user: any;
  iteration: number[] = [0, 1, 2, 3, 4];
  selectedRating: number = 0;
  review: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    this.review = this.fb.group({
      rating: ['', Validators.required],
      text: ['', Validators.required],
      user_id: [this.user['user_id']],
      car_id: [this.carId],
    });
  }

  postReviewModalClose() {
    this.closeReviewModalEmitter.emit(false);
  }

  selectStar(index: number) {
    this.selectedRating = index + 1;
    this.review.get('rating')?.setValue(this.selectedRating);
  }

  postReview() {
    this.userService.postReview(this.review.value).subscribe({
      next: (response: any) => {
        this.closeReviewModalEmitter.emit(false);
        console.log(response.message);
      },
      error: (error: any) => {
        console.error(error, error.message);
      },
    });
    this.closeReviewModalEmitter.emit(false);
  }
}
