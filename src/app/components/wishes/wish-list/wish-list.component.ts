import { AuthService } from 'src/app/services/auth.service';
import { WishService } from './../../../services/wish.service';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(private wishService: WishService, private authService: AuthService) {}

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

  deleteWish(id: string) {
    this.authService
      .getFirebaseAuthState()
      .pipe(
        first(),
        switchMap(user => this.wishService.deleteWishForUser(user.uid, id))
      )
      .subscribe();
  }
}
