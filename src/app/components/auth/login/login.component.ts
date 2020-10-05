import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _store: Store<fromRoot.State>
  ) {}

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this._auth.login({ ...this.loginForm.value });
  }
}
