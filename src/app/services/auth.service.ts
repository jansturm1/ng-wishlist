import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  login(user: User) {
    this.fireAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(_data => {
        console.log(_data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  register(user: User): any {
    this.fireAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(_data => {
        console.log(_data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
