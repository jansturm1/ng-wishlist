import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Wish } from 'src/app/models/wish.model';

@Component({
  selector: 'app-delete-wish-dialog',
  templateUrl: './delete-wish-dialog.component.html',
  styleUrls: ['./delete-wish-dialog.component.css'],
})
export class DeleteWishDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteWishDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Wish) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
