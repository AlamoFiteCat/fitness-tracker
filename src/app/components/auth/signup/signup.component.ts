import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  constructor(
    private _auth: AuthService,
    private _store: Store<fromRoot.State>
  ) {}

  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this._auth.registerUser({ ...f.value });
    }
  }
}
