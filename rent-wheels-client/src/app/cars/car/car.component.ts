import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  showCarList = false;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.searchClicked$.subscribe((clicked) => {
      this.showCarList = clicked;
    });
  }
}
