import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsrComponent } from './usr/usr.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfosComponent } from './usr/user-infos/user-infos.component';
import { LatestRentalComponent } from './usr/latest-rental/latest-rental.component';
import { AllUserReviewsComponent } from './usr/all-user-reviews/all-user-reviews.component';
import { AllUserRentalsComponent } from './usr/all-user-rentals/all-user-rentals.component';

@NgModule({
  declarations: [
    UsrComponent,
    RegisterComponent,
    LoginComponent,
    UserInfosComponent,
    LatestRentalComponent,
    AllUserReviewsComponent,
    AllUserRentalsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent],
  providers: [DatePipe],
})
export class UserModule {}
