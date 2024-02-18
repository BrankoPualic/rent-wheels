import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';

interface Review {
  rating_id: number;
  user_id: number;
  car_id: number;
  rating: number;
  review: string;
  rating_date: string;
  image_src: string;
  image_alt: string;
  full_name: string;
  register_date: string;
}

@Component({
  selector: 'app-car-ratings',
  templateUrl: './car-ratings.component.html',
  styleUrls: ['./car-ratings.component.css'],
})
export class CarRatingsComponent implements OnInit {
  @Input() carId: number;
  ratings: Review[];
  avgRating: number = 0;
  iterations: number[] = [];
  reviewModalVisible: boolean = false;

  constructor(
    private filterService: FilterService,
    private carService: CarService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filterService.carId$.subscribe((carId) => {
      this.carService.getCarReviews(carId).subscribe((response) => {
        this.ratings = response['reviews'];
        const avg = +response['avg']['avg_rating'];
        const avgFormatted = avg.toFixed(2);
        this.avgRating = +avgFormatted;

        this.ratings.forEach((element: any) => {
          this.iterations.push(element.rating);
        });
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

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  openPostingModal() {
    this.reviewModalVisible = true;
  }

  modalClose(value: boolean) {
    this.reviewModalVisible = value;
  }
}
