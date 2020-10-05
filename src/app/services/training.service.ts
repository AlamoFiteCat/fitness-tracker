import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private _af: AngularFirestore, private _us: UiService) {}

  private availableExercises: Exercise[];
  private runningExercise: Exercise;

  // [Subjects]
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  // [Subscriptions]
  fbSubscriptions: Subscription[] = [];

  getAvailableExercises() {
    this._us.loadingStateChanged.next(true);
    this.fbSubscriptions.push(
      this._af
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as Exercise;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this._us.loadingStateChanged.next(false);
          },
          (error) => {
            this.exercisesChanged.next(null);
            this._us.loadingStateChanged.next(false);
            this._us.showSnackbar('Oops! Something went wrong!', null, 3000);
          }
        )
    );
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  getCompletedExercises() {
    this.fbSubscriptions.push(
      this._af
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            exercises.map((ex) => {});
            this.finishedExercisesChanged.next(exercises);
          },
          (error) => {
            console.log(error);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: (this.runningExercise.duration * progress) / 100,
      calories: (this.runningExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    this._af.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
