import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.component.html',
  styleUrls: ['./add-wish.component.css'],
})
export class AddWishComponent implements OnInit {
  // for reseting
  @ViewChild('wForm') form;

  wishForm: FormGroup;

  constructor(private fb: FormBuilder, private wishService: WishService, private authService: AuthService) {}

  ngOnInit() {
    this.wishForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imgUrl: [null, Validators.required],
    });
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.authService
      .getFirebaseAuthState()
      .pipe(
        first(),
        switchMap(user =>
          this.wishService.saveWishForUser(user.uid, {
            name: value.name,
            created: new Date(),
            description: value.description,
            imgUrl: value.imgUrl,
          })
        )
      )
      .subscribe(
        _ => {
          this.form.resetForm();
          // TO_DO: add toast/flash message OK
        },
        e => console.log(e)
      );
  }
}
