import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.css'],
})
export class RentingComponent implements OnInit {
  @Output() closeRentingModalEmitter: EventEmitter<boolean> =
    new EventEmitter();
  @Input() carId: number;
  @Input() carPrice: number;
  user: any;
  renting: FormGroup;
  totalCost: number = 0;
  showValidation: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    this.renting = this.fb.group(
      {
        user_id: this.user.user_id,
        car_id: this.carId,
        date_from: ['', Validators.required],
        date_to: [
          '',
          Validators.compose([
            Validators.required,
            this.validateMinRentalDuration,
          ]),
        ],
        total_cost: [this.totalCost],
      },
      { validators: this.dateValidator }
    );

    this.renting.valueChanges.subscribe(() => {
      const dateFrom = this.renting.get('date_from')?.value;
      const dateTo = this.renting.get('date_to')?.value;

      if (dateFrom && dateTo && dateFrom < dateTo) {
        const hourDifference =
          Math.abs(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
          36e5;
        this.totalCost = hourDifference * this.carPrice; // Adjust with your actual price per hour
        this.renting.get('totalCost')?.setValue(this.totalCost);
      } else {
        this.totalCost = 0;
      }
    });
  }

  rentingModalClose() {
    this.closeRentingModalEmitter.emit(false);
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateFrom = control.get('date_from');
    const dateTo = control.get('date_to');

    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom.value);
      const toDate = new Date(dateTo.value);

      if (fromDate > toDate) {
        return { dateInvalid: true };
      }
    }

    return null;
  }

  validateMinRentalDuration(control: any) {
    const dateFrom = new Date(control.parent?.get('date_from')?.value);
    const dateTo = new Date(control.value);

    if (dateFrom && dateTo) {
      const hourDifference =
        Math.abs(dateTo.getTime() - dateFrom.getTime()) / 36e5;
      const dayDifference = hourDifference / 24;
      return hourDifference >= 5 && dayDifference <= 7
        ? null
        : { invalidDuration: true };
    }

    return null;
  }

  validate() {
    this.showValidation = true;
  }

  onCancel() {
    this.showValidation = false;
  }

  onRent() {
    this.renting.get('total_cost')?.setValue(this.totalCost);
    this.userService.rentACar(this.renting.value).subscribe({
      next: (response: any) => {
        this.closeRentingModalEmitter.emit(false);
        console.log(response.message);
      },
      error: (error: any) => {
        console.error(error, error.message);
      },
    });
    this.closeRentingModalEmitter.emit(false);
  }
}
