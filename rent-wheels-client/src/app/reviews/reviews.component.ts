import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @ViewChild('reviewL') reviewLeft: ElementRef;
  @ViewChild('reviewR') reviewRight: ElementRef;
  @ViewChild('r') reviewsBlock: ElementRef;
  reviews: any;
  iterations: number[] = [];

  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.userService.getHomePageReviews().subscribe((response: any) => {
      this.reviews = response;
      response.forEach((element: any) => {
        this.iterations.push(element.rating);
      });
    });
  }

  transformDate(dateString: string) {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'MMM yyyy');
  }

  getStarsArray(starCount: number): any[] {
    return Array(starCount).fill(0);
  }

  // Scroll

  scrollRightReviews() {
    if (window.innerWidth <= 1441) {
      const slideWidth = 465;
      const currentTranslate =
        parseInt(
          this.reviewsBlock.nativeElement.style.transform.replace(
            'translateX(',
            ''
          ),
          10
        ) || 0;
      const targetTranslate = currentTranslate - slideWidth;
      this.reviewsBlock.nativeElement.style.transform = `translateX(${targetTranslate}px)`;
      this.reviewLeft.nativeElement.style.color = 'var(--black)';
      if (targetTranslate <= -1860) {
        this.reviewsBlock.nativeElement.style.transform = `translateX(-1860px)`;
        this.reviewRight.nativeElement.style.color = 'grey';
      }
    } else {
      const slideWidth = 397;
      const currentTranslate =
        parseInt(
          this.reviewsBlock.nativeElement.style.transform.replace(
            'translateX(',
            ''
          ),
          10
        ) || 0;
      const targetTranslate = currentTranslate - slideWidth;
      this.reviewsBlock.nativeElement.style.transform = `translateX(${targetTranslate}px)`;
      this.reviewLeft.nativeElement.style.color = 'var(--black)';
      if (targetTranslate <= -1191) {
        this.reviewsBlock.nativeElement.style.transform = `translateX(-1191px)`;
        this.reviewRight.nativeElement.style.color = 'grey';
      }
    }
  }

  scrollLeftReviews() {
    if (window.innerWidth <= 1441) {
      const slideWidth = -465;
      const currentTranslate =
        parseInt(
          this.reviewsBlock.nativeElement.style.transform.replace(
            'translateX(',
            ''
          ),
          10
        ) || 0;
      const targetTranslate = currentTranslate - slideWidth;
      this.reviewsBlock.nativeElement.style.transform = `translateX(${targetTranslate}px)`;
      this.reviewRight.nativeElement.style.color = 'var(--black)';
      if (targetTranslate >= 0) {
        this.reviewsBlock.nativeElement.style.transform = `translateX(0px)`;
        this.reviewLeft.nativeElement.style.color = 'grey';
      }
    } else {
      const slideWidth = -397;
      const currentTranslate =
        parseInt(
          this.reviewsBlock.nativeElement.style.transform.replace(
            'translateX(',
            ''
          ),
          10
        ) || 0;
      const targetTranslate = currentTranslate - slideWidth;
      this.reviewsBlock.nativeElement.style.transform = `translateX(${targetTranslate}px)`;
      this.reviewRight.nativeElement.style.color = 'var(--black)';
      if (targetTranslate >= 0) {
        this.reviewsBlock.nativeElement.style.transform = `translateX(0px)`;
        this.reviewLeft.nativeElement.style.color = 'grey';
      }
    }
  }
}
