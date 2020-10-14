import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Store } from '@ngrx/store';
import * as fromTraining from '../../ngrx/training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  // [View Child]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // [Data Table]
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories'];
  dataSource = new MatTableDataSource<Exercise>();

  // [Constructor]
  constructor(
    private _ts: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this._store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises) => {
        this.dataSource.data = exercises;
      });
    this._ts.getCompletedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(e: string) {
    this.dataSource.filter = e.trim().toLowerCase();
  }
}
