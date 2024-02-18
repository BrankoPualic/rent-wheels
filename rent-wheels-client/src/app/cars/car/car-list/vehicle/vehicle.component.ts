import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/cars/car.model';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  cars: Car[] = [];

  constructor(private filterService: FilterService, private router: Router) {}

  ngOnInit(): void {
    this.filterService.filteredData$.subscribe((filteredData) => {
      this.cars = filteredData;
    });
  }

  carSelected(carId: number) {
    this.filterService.setCarSelected(carId);
    this.router.navigate([`cars`, `selected-car`, carId]);
  }
}
