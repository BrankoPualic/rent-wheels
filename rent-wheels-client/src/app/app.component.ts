import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'rent-a-car';
  regModalVisible: boolean = false;
  loginModalVisible: boolean = false;
  pageLoading: boolean = true;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    window.onload = () => {
      this.pageLoading = false;
    };
    this.modalService.openRegisterModal$.subscribe((open) => {
      if (open) {
        this.regModalVisible = true;
      } else {
        this.regModalVisible = false;
      }
    });
    this.modalService.openLoginModal$.subscribe((open) => {
      if (open) {
        this.loginModalVisible = true;
      } else {
        this.loginModalVisible = false;
      }
    });
    this.modalService.closeModal$.subscribe((close) => {
      if (close) {
        this.loginModalVisible = false;
        this.regModalVisible = false;
      }
    });
  }

  modalClose(value: boolean) {
    this.regModalVisible = value;
    this.loginModalVisible = value;
  }

  regModalOpen(value: boolean) {
    this.regModalVisible = value;
  }

  loginModalOpen(value: boolean) {
    this.loginModalVisible = value;
  }
}
