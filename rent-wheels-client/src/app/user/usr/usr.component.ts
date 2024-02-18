import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usr',
  templateUrl: './usr.component.html',
  styleUrls: ['./usr.component.css'],
})
export class UsrComponent {
  showReviews: boolean = false;
  showRentals: boolean = false;

  showAllReviews(value: boolean) {
    this.showReviews = value;
  }

  showAllRentals(value: boolean) {
    this.showRentals = value;
  }

  showProfilePage(value: boolean) {
    this.showRentals = value;
    this.showReviews = value;
  }
}
