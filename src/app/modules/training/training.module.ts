// [Modules]
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TrainingRoutingModule } from '../training-routing/training-routing.module';

// [Components]
import { CurrentTrainingComponent } from '../../components/current-training/current-training.component';
import { NewTrainingComponent } from '../../components/new-training/new-training.component';
import { PastTrainingsComponent } from '../../components/past-trainings/past-trainings.component';
import { StopModalComponent } from '../../components/stop-modal/stop-modal.component';
import { TrainingComponent } from '../../components/training/training.component';

// [NgRx]
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from '../../ngrx/training.reducer';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopModalComponent,
    TrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
})
export class TrainingModule {}
