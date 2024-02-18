import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() openRegister: EventEmitter<boolean> = new EventEmitter();
  @Output() openLogin: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('menu') responsiveMenu: ElementRef;
  extendedUrl: string;
  pageLogo: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.extendedUrl = this.getExtendedUrl();
      }
      this.pageLogo =
        this.extendedUrl === '' ? 'logo-dark.png' : 'logo-white.png';
    });
  }

  private getExtendedUrl(): string {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlSegmentGroup = urlTree.root.children['primary'];
    const segments = urlSegmentGroup?.segments.map((segment) => segment.path);
    return segments ? segments.join('/') : '';
  }

  // Register modal open
  registerOpen() {
    this.openRegister.emit(true);
  }

  // Login modal open
  loginOpen() {
    this.openLogin.emit(true);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  closeMenu() {
    this.responsiveMenu.nativeElement.style.right = '-50vw';
  }

  openMenu() {
    this.responsiveMenu.nativeElement.style.right = '0';
  }
}
