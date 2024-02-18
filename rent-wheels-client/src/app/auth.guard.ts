import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true; // Allow access to the route
    }

    this.router.navigate(['**']); // Redirect to page not found if not authenticated
    return false;
  }
}
