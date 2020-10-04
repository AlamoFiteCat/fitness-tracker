// [Modules]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// [Components]
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { TrainingComponent } from '../../components/training/training.component';

// [Guards]
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
