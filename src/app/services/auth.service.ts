import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _ts: TrainingService,
    private _snackbar: MatSnackBar
  ) {}

  initAuthListener() {
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this._router.navigate(['/training']);
      } else {
        this._ts.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this._router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this._afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._snackbar.open('Welcome, friend!', null, { duration: 3000 });
      })
      .catch((e) => {
        this._snackbar.open(e.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    this._afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._snackbar.open('Welcome back!', null, { duration: 3000 });
      })
      .catch((e) => {
        this._snackbar.open(e.message, null, { duration: 3000 });
      });
  }

  logout() {
    this._afAuth.signOut().then(() => {
      this._snackbar.open('Bai!', null, { duration: 3000 });
    });
  }

  getUser() {}

  isAuth() {
    return this.isAuthenticated;
  }
}
