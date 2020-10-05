import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // [View Child]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // [Data Table]
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories'];
  dataSource = new MatTableDataSource<Exercise>();
  constructor(private _ts: TrainingService) {}
  private exChangedSubscription: Subscription;

  ngOnInit(): void {
    this.exChangedSubscription = this._ts.finishedExercisesChanged.subscribe(
      (exercises) => {
        this.dataSource.data = exercises;
      }
    );
    this._ts.getCompletedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  doFilter(e: string) {
    this.dataSource.filter = e.trim().toLowerCase();
  }
}
