import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: string, duration: number = 3000) {
    this.snackbar.open(message, action, { duration });
  }
}
