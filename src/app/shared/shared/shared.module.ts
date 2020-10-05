import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
