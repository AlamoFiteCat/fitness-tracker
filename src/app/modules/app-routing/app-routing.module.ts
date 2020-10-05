// [Modules]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from '../../modules/auth-routing/auth-routing.module';
// [Components]
import { WelcomeComponent } from '../../components/welcome/welcome.component';

// [Guards]
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () =>
      import('../training/training.module').then((m) => m.TrainingModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
