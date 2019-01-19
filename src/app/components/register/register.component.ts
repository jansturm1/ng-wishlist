import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private wishService: WishService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      imgUrl: [null, Validators.required],
    });
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    console.log(value);
    this.loginForm.reset(this.loginForm.value);
  }
}
