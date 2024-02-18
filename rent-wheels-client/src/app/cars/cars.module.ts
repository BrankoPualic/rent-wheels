import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CarComponent } from './car/car.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { VehicleComponent } from './car/car-list/vehicle/vehicle.component';
import { VehicleDetailComponent } from './car/vehicle-detail/vehicle-detail.component';
import { CarFiltersComponent } from './car/car-filters/car-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { VehicleSliderComponent } from './car/vehicle-detail/vehicle-slider/vehicle-slider.component';
import { PostReviewComponent } from './car/vehicle-detail/post-review/post-review.component';
import { RentingComponent } from './car/vehicle-detail/renting/renting.component';
import { SuggestedCarsComponent } from './car/vehicle-detail/suggested-cars/suggested-cars.component';
import { CarRatingsComponent } from './car/vehicle-detail/car-ratings/car-ratings.component';

@NgModule({
  declarations: [
    CarComponent,
    CarListComponent,
    VehicleComponent,
    VehicleDetailComponent,
    CarFiltersComponent,
    VehicleSliderComponent,
    PostReviewComponent,
    RentingComponent,
    SuggestedCarsComponent,
    CarRatingsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule],
  providers: [DatePipe],
})
export class CarsModule {}
