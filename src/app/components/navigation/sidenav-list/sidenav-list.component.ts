import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this._auth.authChange.subscribe((authState) => {
      this.isAuth = authState;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this._auth.logout();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }
}
