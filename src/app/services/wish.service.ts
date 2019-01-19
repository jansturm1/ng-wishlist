import { Wish } from './../models/wish.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  wishes: Observable<Wish>;

  constructor(private db: AngularFirestore) {}

  getWishesForUser(userId: string): Observable<Wish[]> {
    return <Observable<Wish[]>>this.db
      .collection('/users')
      .doc('D3023yzR6W62fYXFQi8f')
      .collection<Wish>('/wishes')
      .valueChanges();
  }

  saveWishForUser(userID: string, wish: Wish) {
    return this.db
      .collection('/users')
      .doc('D3023yzR6W62fYXFQi8f')
      .collection('/wishes')
      .add(wish);
  }

  deleteWishForUser(userID: string, wishId: string) {
    return this.db
      .collection('/users')
      .doc('D3023yzR6W62fYXFQi8f')
      .collection<Wish>('/wishes')
      .doc<Wish>(`${wishId}`)
      .delete();
  }
}
