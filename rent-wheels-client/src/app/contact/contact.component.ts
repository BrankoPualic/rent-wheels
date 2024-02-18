import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @ViewChild('succ') successMessage: ElementRef;
  counter: number = 0;
  maxLength: number = 500;
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.userService.sendMessage(this.form.value).subscribe((response: any) => {
      this.form.reset();
      this.successMessage.nativeElement.innerText = response.message;
      this.counter = 0;
      setTimeout(() => {
        this.successMessage.nativeElement.innerText = '';
      }, 2000);
    });
  }

  onKeyPress() {
    if (this.form.get('message')?.value === null) {
      this.form.get('message')?.setValue('');
      return;
    }
    this.counter = this.form.get('message')?.value.length;
    if (this.counter > this.maxLength) {
      this.form
        .get('message')
        ?.setValue(
          this.form.get('message')?.value.substring(0, this.maxLength)
        );
    }
  }
}
