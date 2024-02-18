import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarService } from '../services/car.service';
import { FilterService } from '../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-by-home',
  templateUrl: './browse-by-home.component.html',
  styleUrls: ['./browse-by-home.component.css'],
})
export class BrowseByHomeComponent implements OnInit {
  @ViewChild('types') typesBlock: ElementRef;
  @ViewChild('locations') locationsBlock: ElementRef;
  @ViewChild('locR') locRight: ElementRef;
  @ViewChild('locL') locLeft: ElementRef;
  @ViewChild('typeR') typeRight: ElementRef;
  @ViewChild('typeL') typeLeft: ElementRef;
  carTypes: any;
  carLocations: any;

  constructor(
    private carService: CarService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getCarTypes().subscribe((response: any) => {
      this.carTypes = response;
    });

    this.carService.getLocations().subscribe((response: any) => {
      this.carLocations = response;
    });
  }

  //Type scroll

  scrollRightType() {
    const slideWidth = 14.75; // Adjust as needed
    const currentTranslate =
      parseInt(
        this.typesBlock.nativeElement.style.transform.replace(
          'translateX(',
          ''
        ),
        10
      ) || 0;
    const targetTranslate = currentTranslate - slideWidth;
    this.typesBlock.nativeElement.style.transform = `translateX(${targetTranslate}%)`;
    this.typeLeft.nativeElement.style.color = 'var(--black)';
    console.log(targetTranslate);
    if (targetTranslate <= -28.75) {
      this.typesBlock.nativeElement.style.transform = `translateX(-28.75%)`;
      this.typeRight.nativeElement.style.color = 'grey';
    }
  }

  scrollLeftType() {
    const slideWidth = -14.5; // Adjust as needed
    const currentTranslate =
      parseInt(
        this.typesBlock.nativeElement.style.transform.replace(
          'translateX(',
          ''
        ),
        10
      ) || 0;
    const targetTranslate = currentTranslate - slideWidth;
    this.typesBlock.nativeElement.style.transform = `translateX(${targetTranslate}%)`;
    this.typeRight.nativeElement.style.color = 'var(--black)';
    if (targetTranslate >= 0) {
      this.typesBlock.nativeElement.style.transform = `translateX(0%)`;
      this.typeLeft.nativeElement.style.color = 'grey';
    }
  }

  // Location scroll

  scrollRightLoc() {
    const slideWidth = 11.5; // Adjust as needed
    const currentTranslate =
      parseInt(
        this.locationsBlock.nativeElement.style.transform.replace(
          'translateX(',
          ''
        ),
        10
      ) || 0;
    const targetTranslate = currentTranslate - slideWidth;
    this.locationsBlock.nativeElement.style.transform = `translateX(${targetTranslate}%)`;
    this.locLeft.nativeElement.style.color = 'var(--black)';
    if (targetTranslate <= -44.5) {
      this.locationsBlock.nativeElement.style.transform = `translateX(-44.5%)`;
      this.locRight.nativeElement.style.color = 'grey';
    }
  }

  scrollLeftLoc() {
    const slideWidth = -11; // Adjust as needed
    const currentTranslate =
      parseInt(
        this.locationsBlock.nativeElement.style.transform.replace(
          'translateX(',
          ''
        ),
        10
      ) || 0;
    const targetTranslate = currentTranslate - slideWidth;
    this.locationsBlock.nativeElement.style.transform = `translateX(${targetTranslate}%)`;
    this.locRight.nativeElement.style.color = 'var(--black)';
    if (targetTranslate >= 0) {
      this.locLeft.nativeElement.style.color = 'grey';
      this.locationsBlock.nativeElement.style.transform = `translateX(0%)`;
    }
  }

  // Type selected
  typeSelected(typeId: number) {
    this.filterService.setTypeSelected(typeId);
    this.router.navigate(['/cars']);
  }

  // Location selected
  locationSelected(locationId: number) {
    this.filterService.setLocationSelected(locationId);
    this.router.navigate(['/cars']);
  }
}
