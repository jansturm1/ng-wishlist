import { AuthService } from './../../services/auth.service';
import { WishService } from './../../services/wish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    console.log(value);
    this.authService.login({ email: value.email, password: value.password });
    this.loginForm.reset(this.loginForm.value);
  }
}
