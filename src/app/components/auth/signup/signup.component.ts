import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  constructor(private _auth: AuthService, private _us: UiService) {}

  isLoading = false;
  private loadingSubs: Subscription;

  ngOnInit(): void {
    this.loadingSubs = this._us.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit(f: NgForm) {
    console.log(this.isLoading);
    if (f.valid) {
      this._auth.registerUser({ ...f.value });
    }
  }
}
