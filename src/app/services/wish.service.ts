import { Wish } from './../models/wish.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  wishes: Observable<Wish>;

  constructor(private db: AngularFirestore) {}

  getWishesForUser(userId: string): Observable<Wish[]> {
    return <Observable<Wish[]>>this.db
      .collection('/users')
      .doc(userId)
      .collection<Wish>('/wishes')
      .snapshotChanges()
      .pipe(
        map(wishesArray => {
          return wishesArray.map(wish => {
            return {
              id: wish.payload.doc.id,
              name: wish.payload.doc.data().name,
              description: wish.payload.doc.data().description,
              created: wish.payload.doc.data().created,
              imgUrl: wish.payload.doc.data().imgUrl,
            };
          });
        })
      );
  }

  saveWishForUser(userID: string, wish: Wish) {
    return this.db
      .collection('/users')
      .doc(userID)
      .collection('/wishes')
      .add(wish);
  }

  deleteWishForUser(userID: string, wishId: string) {
    return this.db
      .collection('/users')
      .doc(userID)
      .collection<Wish>('/wishes')
      .doc<Wish>(`${wishId}`)
      .delete();
  }
}
