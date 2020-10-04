import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/services/training.service';
import { StopModalComponent } from '../stop-modal/stop-modal.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(private _dialog: MatDialog, private _ts: TrainingService) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = (this._ts.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this._ts.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
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
