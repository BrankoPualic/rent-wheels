import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  noCarsFiltered: boolean = false;
  fetching: boolean = false;

  constructor(private filterService: FilterService) {}
  ngOnInit(): void {
    this.filterService.filteredData$.subscribe((filteredData) => {
      this.noCarsFiltered = filteredData.length > 0 ? false : true;
    });
    this.filterService.fetching$.subscribe((fetching) => {
      this.fetching = fetching;
    });
  }
}
