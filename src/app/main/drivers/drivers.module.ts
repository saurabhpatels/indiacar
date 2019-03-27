import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriversComponent} from './drivers.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '../../../@fuse/shared.module';

const routes = [
    {
        path     : 'drivers',
        component: DriversComponent
    }
];
@NgModule({
  declarations: [DriversComponent],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      TranslateModule,

      FuseSharedModule
  ], exports: [DriversComponent]
})
export class DriversModule { }
