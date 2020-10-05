import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { UiService } from '../shared/ui.service';

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
    private _us: UiService
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
    this._us.loadingStateChanged.next(true);
    this._afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._us.showSnackbar('Welcome, friend!', null, 3000);
        this._us.loadingStateChanged.next(false);
      })
      .catch((e) => {
        this._us.showSnackbar(e.message, null, 3000);
        this._us.loadingStateChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this._us.loadingStateChanged.next(true);
    this._afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._us.showSnackbar('Welcome back!', null, 3000);
        this._us.loadingStateChanged.next(false);
      })
      .catch((e) => {
        this._us.showSnackbar(e.message, null, 3000);
        this._us.loadingStateChanged.next(false);
      });
  }

  logout() {
    this._afAuth.signOut().then(() => {
      this._us.showSnackbar('Bai!', null, 3000);
    });
  }

  getUser() {}

  isAuth() {
    return this.isAuthenticated;
  }
}
