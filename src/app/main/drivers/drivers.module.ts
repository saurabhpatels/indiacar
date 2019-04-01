import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriversComponent} from './drivers.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [DriversComponent],
  imports: [

      CommonModule,
      TranslateModule,
      FuseSharedModule,
      MatIconModule
  ], exports: [DriversComponent]
})
export class DriversModule { }
