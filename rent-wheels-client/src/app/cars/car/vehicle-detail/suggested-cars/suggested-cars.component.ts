import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-suggested-cars',
  templateUrl: './suggested-cars.component.html',
  styleUrls: ['./suggested-cars.component.css'],
})
export class SuggestedCarsComponent implements OnInit {
  sameTypeCars: any[] = [];

  constructor(
    private filterService: FilterService,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.filterService.carId$.subscribe((carId) => {
      this.carService.getSameTypeCars(carId).subscribe((cars) => {
        if (Array.isArray(cars)) {
          this.sameTypeCars = cars;
        } else if (typeof cars === 'object') {
          this.sameTypeCars.length = 0;
        }
      });
    });
  }

  carSelected(carId: number) {
    this.filterService.setCarSelected(carId);
    this.router.navigate([`cars`, `selected-car`, carId]);
  }
}
