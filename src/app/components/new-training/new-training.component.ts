import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;
  loadingSubs: Subscription;
  constructor(private ts: TrainingService, private _us: UiService) {}

  ngOnInit(): void {
    this.loadingSubs = this._us.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
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
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  onStartTraining(f: NgForm) {
    this.ts.startExercise(f.value.selectedExercise);
  }
  fetchExercises() {
    this.ts.getAvailableExercises();
  }
}
