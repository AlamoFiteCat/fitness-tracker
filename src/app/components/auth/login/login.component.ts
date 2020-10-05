import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private _auth: AuthService, private _us: UiService) {}

  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  ngOnInit(): void {
    this.loadingSubs = this._us.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit() {
    this._auth.login({ ...this.loginForm.value });
  }
}
