import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../ngrx/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private ts: TrainingService,
    private _store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.ts.exercisesChanged.subscribe(
      (exercises) => {
        this.availableExercises = exercises;
      }
    );
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  onStartTraining(f: NgForm) {
    this.ts.startExercise(f.value.selectedExercise);
  }
  fetchExercises() {
    this.ts.getAvailableExercises();
  }
}
