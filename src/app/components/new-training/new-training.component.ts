import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[];
  constructor(private ts: TrainingService) {}

  ngOnInit(): void {
    this.availableExercises = this.ts.getAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.ts.startExercise(f.value.selectedExercise);
  }
}
