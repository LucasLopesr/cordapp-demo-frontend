import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  success(message: string) {
    this.openSnackBar(message, 'success-snackbar');
  }

  error(message: string) {
    this.openSnackBar(message, 'error-snackbar');
  }

  private openSnackBar(message: string, extraClass: string) {
    this.snackBar.open(message, 'X', {
      duration: 4000,
      extraClasses: [extraClass],
      verticalPosition: 'top'
    });
  }
}
