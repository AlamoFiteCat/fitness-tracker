import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private _router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this._router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.authChange.next(true);
    this._router.navigate(['/training']);
  }
}
