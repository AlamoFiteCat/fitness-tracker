import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private _snack: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this._snack.open(message, action, {
      duration,
    });
  }
}
