import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private ts: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.ts.exercisesChanged.subscribe(
      (exercises) => {
        this.availableExercises = exercises;
      }
    );
    this.ts.getAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(f: NgForm) {
    this.ts.startExercise(f.value.selectedExercise);
  }
}
