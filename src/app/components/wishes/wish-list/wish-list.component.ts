import { DeleteWishDialogComponent } from './../delete-wish-dialog/delete-wish-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { switchMap, first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(public dialog: MatDialog, private wishService: WishService, private authService: AuthService) {}

  wishes: Wish[] = [];

  ngOnInit() {
    this.authService
      .getFirebaseAuthState()
      .pipe(
        first(),
        switchMap(user => this.wishService.getWishesForUser(user.uid))
      )
      .subscribe(
        wishes => {
          this.wishes = wishes;
        },
        e => {
          console.log(e);
        }
      );
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
