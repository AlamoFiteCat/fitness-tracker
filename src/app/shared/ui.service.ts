import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private _snack: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this._snack.open(message, action, {
      duration,
    });
  }
}
