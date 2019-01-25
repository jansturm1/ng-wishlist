import { UiService } from './../../../services/ui.service';
import { DeleteWishDialogComponent } from './../delete-wish-dialog/delete-wish-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { switchMap, first, takeUntil, tap } from 'rxjs/operators';
import { MatDialog, PageEvent } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  isLoading = false;

  // MatPaginator Inputs
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 10];
  pageIndex = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    public dialog: MatDialog,
    private wishService: WishService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  wishes: Wish[] = [];
  wishesPage: Wish[] = [];

  ngOnInit() {
    this.loadWishes();
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  private loadWishes() {
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
          this.wishesPage = this.wishes.slice(
            0,
            this.pageSize < this.wishes.length ? this.pageSize : this.wishes.length
          );
        },
        er => {
          this.isLoading = false;
          console.log(er);
        }
      );
  }

  private loadWishesPaging(e?) {
    const offset = e.pageIndex * e.pageSize;
    const end = offset + e.pageSize;
    this.wishesPage = this.wishes.slice(offset, end > this.wishes.length ? this.wishes.length : end);
  }
}
