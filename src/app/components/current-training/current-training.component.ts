import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/services/training.service';
import { StopModalComponent } from '../stop-modal/stop-modal.component';

import { Store } from '@ngrx/store';
import * as fromTraining from '../../ngrx/training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(
    private _dialog: MatDialog,
    private _ts: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        const step = (exercise.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this._ts.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this._dialog.open(StopModalComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._ts.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
