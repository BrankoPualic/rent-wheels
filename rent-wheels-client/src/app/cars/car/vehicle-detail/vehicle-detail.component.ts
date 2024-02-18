import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';
import { Car } from '../../car.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css'],
})
export class VehicleDetailComponent implements OnInit {
  selectedCar: Car;
  selectedCarImages: any[] = [];
  rentingModalVisible: boolean = false;

  constructor(
    private filterService: FilterService,
    private carService: CarService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filterService.carId$.subscribe((carId) => {
      this.carService.getCarById(carId).subscribe({
        next: (response) => {
          this.selectedCar = response['selected-car'];
          this.selectedCarImages = response['car-images'];
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['**']);
        },
      });
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  openRentingModal() {
    this.rentingModalVisible = true;
  }

  modalClose(value: boolean) {
    this.rentingModalVisible = value;
  }
}
