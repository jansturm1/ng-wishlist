import { UiService } from './../../../services/ui.service';
import { DeleteWishDialogComponent } from './../delete-wish-dialog/delete-wish-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { switchMap, first, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private wishService: WishService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  wishes: Wish[] = [];

  ngOnInit() {
    this.authService
      .getFirebaseAuthState()
      .pipe(
        tap(_ => (this.isLoading = true)),
        takeUntil(this.onDestroy$),
        first(),
        switchMap(user => this.wishService.getWishesForUser(user.uid))
      )
      .subscribe(
        wishes => {
          this.wishes = wishes;
          this.isLoading = false;
        },
        e => {
          this.isLoading = false;
          console.log(e);
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  deleteWish(wish: Wish) {
    const dialogRef = this.dialog.open(DeleteWishDialogComponent, {
      width: '250px',
      data: wish,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed');
      if (result) {
        this.authService
          .getFirebaseAuthState()
          .pipe(
            first(),
            switchMap(user => this.wishService.deleteWishForUser(user.uid, wish.id))
          )
          .subscribe(
            _ => {},
            e => {
              console.log(e);
            }
          );
      }
    });
  }
}
