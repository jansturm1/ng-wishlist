import { LoginComponent } from './components/login/login.component';
import { WishesComponent } from './components/wishes/wishes.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'wishes', component: WishesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
