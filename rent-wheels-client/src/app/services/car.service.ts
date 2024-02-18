import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private dataService: DataService) {}

  getCarTypes(): Observable<any> {
    return this.dataService.getData('cars/getCarsType.php');
  }

  getLocations(): Observable<any> {
    return this.dataService.getData('location/getLocations.php');
  }

  getMaxAndMinCarPrice(): Observable<any> {
    return this.dataService.getData('cars/getMinMaxPrice.php');
  }

  getCars(filterFormValues: any): Observable<any> {
    return this.dataService.postDataJson(
      filterFormValues,
      'cars/getFilteredCars.php'
    );
  }

  getDropDownLists(): Observable<any> {
    return this.dataService.getData('cars/getDropDownLists.php');
  }

  getCarById(carId: number): Observable<any> {
    return this.dataService.postDataJson(carId, 'cars/getCarById.php');
  }

  getSameTypeCars(carId: number): Observable<any> {
    return this.dataService.postDataJson(carId, 'cars/getSameTypeCars.php');
  }

  getCarReviews(carId: number): Observable<any> {
    return this.dataService.postDataJson(carId, 'cars/getCarReviews.php');
  }
}
