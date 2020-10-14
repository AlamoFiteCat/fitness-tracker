import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take, takeLast } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../ngrx/training.reducer';
import * as UI from '../ngrx/ui.actions';
import * as Training from '../ngrx/training.actions';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(
    private _af: AngularFirestore,
    private _us: UiService,
    private _store: Store<fromTraining.State>
  ) {}

  // [Subjects]
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  // [Subscriptions]
  fbSubscriptions: Subscription[] = [];

  getAvailableExercises() {
    this._store.dispatch(new UI.StartLoading());
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
            this._store.dispatch(new Training.SetAvailableTrainings(exercises));
            this._store.dispatch(new UI.StopLoading());
          },
          (error) => {
            this.exercisesChanged.next(null);
            this._store.dispatch(new UI.StopLoading());
            this._us.showSnackbar('Oops! Something went wrong!', null, 3000);
          }
        )
    );
  }

  getCompletedExercises() {
    this.fbSubscriptions.push(
      this._af
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this._store.dispatch(new Training.SetFinishedTrainings(exercises));
          },
          (error) => {
            console.log(error);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this._store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed',
        });
      });

    this._store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number) {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addDataToDatabase({
          ...ex,
          duration: (ex.duration * progress) / 100,
          calories: (ex.calories * progress) / 100,
          date: new Date(),
          state: 'cancelled',
        });
      });
    this._store.dispatch(new Training.StopTraining());
  }

  private addDataToDatabase(exercise: Exercise) {
    this._af.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
