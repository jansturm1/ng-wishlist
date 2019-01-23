import { UiService } from './../../../services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.component.html',
  styleUrls: ['./add-wish.component.css'],
})
export class AddWishComponent implements OnInit, OnDestroy {
  // for reseting
  @ViewChild('wForm') form;

  onDestroy$ = new Subject<void>();

  wishForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private wishService: WishService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.wishForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imgUrl: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.authService
      .getFirebaseAuthState()
      .pipe(
        takeUntil(this.onDestroy$),
        first(),
        tap(_ => (this.isLoading = true)),
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
          this.isLoading = false;
          this.uiService.showSnackbar('Wish added!', null);
        },
        e => {
          console.log(e);
          this.isLoading = false;
        }
      );
  }
}
