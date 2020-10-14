import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from '../../ngrx/training.reducer';
import * as fromRoot from '../../ngrx/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  availableExercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private ts: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.availableExercises$ = this._store.select(
      fromTraining.getAvailableExercises
    );
    this.fetchExercises();
  }

  onStartTraining(f: NgForm) {
    this.ts.startExercise(f.value.selectedExercise);
  }
  fetchExercises() {
    this.ts.getAvailableExercises();
  }
}
