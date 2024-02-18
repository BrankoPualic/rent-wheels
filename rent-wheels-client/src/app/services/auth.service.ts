import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getUserFromToken() {
    const token = localStorage.getItem('token');

    if (token) {
      return this.jwtHelper.decodeToken(token);
    }

    return null;
  }

  isLoggedIn() {
    const user = this.getUserFromToken();

    return !!user;
  }
}
