import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User as FirebaseUser } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isUserLogedIn = false;
  fireBaseUser: FirebaseUser;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getFirebaseAuthState().subscribe(
      user => {
        console.log('GetFbState');
        console.log(user);

        this.isUserLogedIn = user ? true : false;
        this.fireBaseUser = user ? user : undefined;
        if (user) {
          this.router.navigate(['wishes']);
        } else {
          this.router.navigate(['login']);
        }
      },
      error => {
        console.log(error);
        this.isUserLogedIn = false;
        this.fireBaseUser = undefined;
      }
    );
  }

  onLogout() {
    this.authService
      .logoutFromFirebase()
      .then(i => {
        this.isUserLogedIn = true;
      })
      .catch(error => {
        this.isUserLogedIn = false;
      });
  }
}
