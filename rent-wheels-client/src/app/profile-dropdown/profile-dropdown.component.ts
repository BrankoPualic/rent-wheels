import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css'],
})
export class ProfileDropdownComponent {
  showDropdown = false;
  user: any;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.user = this.authService.getUserFromToken();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.querySelector('.profile-button');

    // Check if the click occurred outside the dropdown
    if (target && !dropdownButton?.contains(target)) {
      this.showDropdown = false;
    }
  }

  // Register modal open
  openRegisterModal() {
    this.modalService.emitOpenRegisterModal(true);
    this.showDropdown = false;
  }

  // Login modal open
  openLoginModal() {
    this.modalService.emitOpenLoginModal(true);
    this.showDropdown = false;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
  }
}
