import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  openRegisterModal() {
    this.modalService.emitOpenRegisterModal(true);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  navigate() {
    this.router.navigate(['user']);
  }
}
