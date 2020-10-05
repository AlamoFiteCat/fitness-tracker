import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from '../../components/current-training/current-training.component';
import { NewTrainingComponent } from '../../components/new-training/new-training.component';
import { PastTrainingsComponent } from '../../components/past-trainings/past-trainings.component';
import { StopModalComponent } from '../../components/stop-modal/stop-modal.component';
import { TrainingComponent } from '../../components/training/training.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TrainingRoutingModule } from '../training-routing/training-routing.module';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopModalComponent,
    TrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule],
})
export class TrainingModule {}
