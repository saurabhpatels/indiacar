import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './bookings.component';
import {MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '../../../@fuse/shared.module';


@NgModule({
  declarations: [BookingsComponent],
  imports: [
      CommonModule,
      MatIconModule,
      TranslateModule,
      FuseSharedModule,
  ], exports: [
      BookingsComponent
    ]
})
export class BookingsModule { }
