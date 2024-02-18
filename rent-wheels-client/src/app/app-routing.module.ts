import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './cars/car/car.component';
import { ContactComponent } from './contact/contact.component';
import { UsrComponent } from './user/usr/usr.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VehicleDetailComponent } from './cars/car/vehicle-detail/vehicle-detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cars',
    component: CarComponent,
  },
  { path: 'cars/selected-car/:id', component: VehicleDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UsrComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
