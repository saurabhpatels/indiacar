import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {FuseSharedModule} from '../../../@fuse/shared.module';
import { UsersComponent } from './users.component';
const routes = [
    {
        path     : 'users',
        component: UsersComponent
    }
];
@NgModule({
  declarations: [UsersComponent],
  imports: [
      RouterModule.forChild(routes),
    CommonModule,
      TranslateModule,

      FuseSharedModule
  ], exports: [UsersComponent]
})
export class UsersModule { }
