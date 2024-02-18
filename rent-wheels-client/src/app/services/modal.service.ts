import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private openRegisterModal: Subject<boolean> = new Subject<boolean>();
  openRegisterModal$: Observable<boolean> =
    this.openRegisterModal.asObservable();
  private openLoginModal: Subject<boolean> = new Subject<boolean>();
  openLoginModal$: Observable<boolean> = this.openLoginModal.asObservable();
  private closeModal: Subject<boolean> = new Subject<boolean>();
  closeModal$: Observable<boolean> = this.closeModal.asObservable();

  emitOpenRegisterModal(open: boolean) {
    this.openRegisterModal.next(open);
  }

  emitOpenLoginModal(open: boolean) {
    this.openLoginModal.next(open);
  }

  emitCloseModal(close: boolean) {
    this.closeModal.next(close);
  }
}
