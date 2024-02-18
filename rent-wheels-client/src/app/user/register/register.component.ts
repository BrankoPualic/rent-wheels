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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('succ') successMessage: ElementRef;
  @ViewChild('err') errorMessage: ElementRef;
  @Output() closeRegModalEmitter: EventEmitter<boolean> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(this.userService.fullNameRe)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.userService.passwordRe)],
      ],
      image: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  onRegSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('image', this.form.get('image')?.value);
    this.userService.userRegister(formData).subscribe({
      next: (response: any) => {
        this.form.reset();
        this.successMessage.nativeElement.innerText = response.message;
        const fileInput = document.getElementById(
          'uploadImage'
        ) as HTMLInputElement;
        fileInput.value = '';
      },
      error: (error: any) => {
        this.errorMessage.nativeElement.innerText = error.message;
      },
    });
  }

  // Modal close
  regModalClose() {
    this.closeRegModalEmitter.emit(false);
  }

  // See password

  seePassword(block: HTMLElement, icon: HTMLElement) {
    block.attributes[1].value === 'password'
      ? ((block.attributes[1].value = 'text'),
        (icon.attributes[1].value = 'fa-regular fa-eye-slash'))
      : ((block.attributes[1].value = 'password'),
        (icon.attributes[1].value = 'fa-regular fa-eye'));
  }
}
