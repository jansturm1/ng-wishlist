import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatPaginatorModule,
  MatCardModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
