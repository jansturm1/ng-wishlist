import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WishesComponent } from './components/wishes/wishes.component';
import { AddWishComponent } from './components/wishes/add-wish/add-wish.component';
import { EditWishComponent } from './components/wishes/edit-wish/edit-wish.component';
import { WishListComponent } from './components/wishes/wish-list/wish-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DeleteWishDialogComponent } from './components/wishes/delete-wish-dialog/delete-wish-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WishesComponent,
    AddWishComponent,
    EditWishComponent,
    WishListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DeleteWishDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteWishDialogComponent],
})
export class AppModule {}
