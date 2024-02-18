import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @ViewChild('succ') successMessage: ElementRef;
  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private userSevice: UserService) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.userSevice
      .subscribeToNews(this.emailForm.value)
      .subscribe((response: any) => {
        this.emailForm.reset();
        this.successMessage.nativeElement.innerText = response.message;
        setTimeout(() => {
          this.successMessage.nativeElement.innerText = '';
        }, 2000);
      });
  }
}
