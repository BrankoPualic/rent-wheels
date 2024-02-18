import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CarsModule } from './cars/cars.module';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { BrowseByHomeComponent } from './browse-by-home/browse-by-home.component';
import { UserModule } from './user/user.module';
import { AuthGuard } from './auth.guard';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DatePipe } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const jwtOptions = {
  tokenGetter: tokenGetter,
  // allowedDomains: [],
  // disallowedRoutes: [],
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    BrowseByHomeComponent,
    ProfileDropdownComponent,
    ReviewsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: tokenGetter,
      },
    }),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: jwtOptions },
    JwtHelperService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
