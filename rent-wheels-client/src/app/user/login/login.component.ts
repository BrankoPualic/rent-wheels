import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('succ') successMessage: ElementRef;
  @ViewChild('err') errorMessage: ElementRef;
  @Output() closeLoginModalEmitter: EventEmitter<boolean> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.userService.passwordRe)],
      ],
    });
  }

  loginModalClose() {
    this.closeLoginModalEmitter.emit(false);
  }

  onLoginSubmit() {
    this.userService.userLogin(this.form.value).subscribe({
      next: (response: any) => {
        if (response.message === 'User not found!') {
          this.errorMessage.nativeElement.innerText = response.message;
        } else {
          const token = response.token;
          localStorage.setItem('token', token);
          this.closeLoginModalEmitter.emit(false);
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
