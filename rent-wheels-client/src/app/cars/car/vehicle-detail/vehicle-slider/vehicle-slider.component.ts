import { Component, Input, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-vehicle-slider',
  templateUrl: './vehicle-slider.component.html',
  styleUrls: ['./vehicle-slider.component.css'],
})
export class VehicleSliderComponent implements OnInit {
  @Input() slides: any[] = [];
  selectedImageSrc: string;
  selectedImageAlt: string;

  constructor(
    private filterService: FilterService,
    private carService: CarService
  ) {}
  ngOnInit(): void {
    this.filterService.carId$.subscribe((carId) => {
      this.carService.getCarById(carId).subscribe({
        next: (response) => {
          this.slides = response['car-images'];
          this.selectedImageSrc = this.slides[0].image_src;
          this.selectedImageAlt = this.slides[0].image_alt;
        },
      });
    });
    this.selectedImageSrc = this.slides[0].image_src;
    this.selectedImageAlt = this.slides[0].image_alt;
  }

  changeImage(index: number) {
    this.selectedImageSrc = this.slides[index].image_src;
    this.selectedImageAlt = this.slides[index].image_alt;
  }
}
