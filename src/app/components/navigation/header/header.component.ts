import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../../ngrx/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(
    private _store: Store<fromRoot.State>,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(fromRoot.getIsAuth);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout() {
    this._auth.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
