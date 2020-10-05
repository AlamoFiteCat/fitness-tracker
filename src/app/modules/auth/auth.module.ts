import { NgModule } from '@angular/core';
import { LoginComponent } from '../../components/auth/login/login.component';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [ReactiveFormsModule, AngularFireAuthModule, SharedModule],
  exports: [],
})
export class AuthModule {}
