import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[];
  @Output() trainingStart = new EventEmitter();
  constructor(private ts: TrainingService) {}

  ngOnInit(): void {
    this.availableExercises = this.ts.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
