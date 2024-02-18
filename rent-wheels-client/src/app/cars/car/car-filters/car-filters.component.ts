import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';
import { Car } from '../../car.model';

@Component({
  selector: 'app-car-filters',
  templateUrl: './car-filters.component.html',
  styleUrls: ['./car-filters.component.css'],
})
export class CarFiltersComponent implements OnInit {
  minAvailablePrice: number;
  maxAvailablePrice: number;
  filterForm: FormGroup;
  dropDownLists: any[] = [];
  selectedTypeId: number = 0;
  selectedLocationId: number = 0;

  constructor(
    private filterService: FilterService,
    private fb: FormBuilder,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.carService.getDropDownLists().subscribe((response: any) => {
      this.dropDownLists = response;
    });

    this.carService.getMaxAndMinCarPrice().subscribe((response: any) => {
      this.minAvailablePrice = response.minPrice;
      this.maxAvailablePrice = response.maxPrice;
    });
    this.filterForm = this.fb.group({
      search: [''],
      brand: [0],
      type: [0],
      year: [0],
      location: [0],
      price: this.fb.group({
        minPrice: [
          this.minAvailablePrice,
          Validators.min(this.minAvailablePrice),
        ],
        maxPrice: [
          this.maxAvailablePrice,
          Validators.max(this.maxAvailablePrice),
        ],
      }),
      transmission: [],
      newCar: [false],
      recCar: [false],
    });

    this.filterService.typeId$.subscribe((typeId) => {
      this.selectedTypeId = typeId;
    });
    if (this.selectedTypeId > 0) {
      this.filterForm.get('type')?.setValue(this.selectedTypeId);
      this.onSearchClick();
    }

    this.filterService.locationId$.subscribe((locationId) => {
      this.selectedLocationId = locationId;
    });
    if (this.selectedLocationId > 0) {
      this.filterForm.get('location')?.setValue(this.selectedLocationId);
      this.onSearchClick();
    }
  }

  onSearchClick() {
    // Search Logic
    this.filterService.setFetching(true);

    this.carService.getCars(this.filterForm.value).subscribe((response) => {
      const filteredCars: Car[] = response;

      this.filterService.updateFilteredData(filteredCars);
      this.filterService.setFetching(false);
    });
    ///////
    this.filterService.setSearchClicked(true);
  }

  setValueMin() {
    const maxPriceControl = this.filterForm.get('price.maxPrice');
    const minPriceControl = this.filterForm.get('price.minPrice');

    const maxPrice = maxPriceControl?.value;
    const minPrice = minPriceControl?.value;

    if (minPrice && minPrice < this.minAvailablePrice) {
      minPriceControl?.setValue(this.minAvailablePrice);
    }

    if (maxPrice && minPrice && minPrice > maxPrice) {
      minPriceControl?.setValue(maxPrice);
    }

    if (minPrice && minPrice > this.maxAvailablePrice) {
      minPriceControl?.setValue(Math.min(minPrice, this.maxAvailablePrice));
    }
    if (minPrice === '') {
      minPriceControl?.setValue(this.minAvailablePrice);
    }
  }

  setValueMax() {
    const maxPriceControl = this.filterForm.get('price.maxPrice');
    const minPriceControl = this.filterForm.get('price.minPrice');

    const maxPrice = maxPriceControl?.value;
    const minPrice = minPriceControl?.value;

    if (maxPrice && maxPrice > this.maxAvailablePrice) {
      maxPriceControl?.setValue(this.maxAvailablePrice);
    }

    if (minPrice && maxPrice && maxPrice < minPrice) {
      maxPriceControl?.setValue(minPrice);
    }

    if (maxPrice && maxPrice < this.minAvailablePrice) {
      maxPriceControl?.setValue(Math.max(maxPrice, this.minAvailablePrice));
    }
    if (maxPrice === '') {
      maxPriceControl?.setValue(this.minAvailablePrice);
    }
  }
}
