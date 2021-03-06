import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../ngrx/app.reducer';
import * as Auth from '../ngrx/auth.actions';
import * as UI from '../ngrx/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _ts: TrainingService,
    private _us: UiService,
    private _store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this._store.dispatch(new Auth.SetAuthenticated());
        this._router.navigate(['/training']);
      } else {
        this._ts.cancelSubscriptions();
        this._store.dispatch(new Auth.SetUnauthenticated());
        this._router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._us.showSnackbar('Welcome, friend!', null, 3000);
        this._store.dispatch(new UI.StopLoading());
      })
      .catch((e) => {
        this._us.showSnackbar(e.message, null, 3000);
        this._store.dispatch(new UI.StopLoading());
      });
  }

  login(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this._us.showSnackbar('Welcome back!', null, 3000);

        this._store.dispatch(new UI.StopLoading());
      })
      .catch((e) => {
        this._us.showSnackbar(e.message, null, 3000);

        this._store.dispatch(new UI.StopLoading());
      });
  }

  logout() {
    this._afAuth.signOut().then(() => {
      this._us.showSnackbar('Bai!', null, 3000);
    });
  }
}
