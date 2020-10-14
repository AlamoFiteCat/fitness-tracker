import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../../ngrx/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(
    private _auth: AuthService,
    private _store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(fromRoot.getIsAuth);
  }

  onLogout() {
    this._auth.logout();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }
}
