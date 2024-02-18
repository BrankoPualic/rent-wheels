import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../cars/car.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredData = new BehaviorSubject<Car[]>([]);
  filteredData$ = this.filteredData.asObservable();
  private searchClickedSubject = new BehaviorSubject<boolean>(false);
  searchClicked$ = this.searchClickedSubject.asObservable();
  private typeIdSubject = new BehaviorSubject<number>(0);
  typeId$ = this.typeIdSubject.asObservable();
  private locationIdSubject = new BehaviorSubject<number>(0);
  locationId$ = this.locationIdSubject.asObservable();
  private fetchingSubject = new BehaviorSubject<boolean>(false);
  fetching$ = this.fetchingSubject.asObservable();
  private carIdSelected = new BehaviorSubject<number>(0);
  carId$ = this.carIdSelected.asObservable();

  setSearchClicked(value: boolean) {
    this.searchClickedSubject.next(value);
  }

  updateFilteredData(filteredData: Car[]): void {
    this.filteredData.next(filteredData);
  }

  setTypeSelected(typeId: number) {
    this.typeIdSubject.next(typeId);
  }

  setLocationSelected(locationId: number) {
    this.locationIdSubject.next(locationId);
  }

  setFetching(value: boolean) {
    this.fetchingSubject.next(value);
  }

  setCarSelected(carId: number) {
    this.carIdSelected.next(carId);
  }
}
