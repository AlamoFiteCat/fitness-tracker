import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTraining from '../../ngrx/training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  constructor(private _store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.ongoingTraining$ = this._store.select(fromTraining.getIsTraining);
  }
}
