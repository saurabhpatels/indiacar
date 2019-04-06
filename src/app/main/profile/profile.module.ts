import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from './profile.service';
import {ProfileTimelineComponent} from './tabs/timeline/timeline.component';
import {ProfileComponent} from './profile.component';
import {ProfilePhotosVideosComponent} from './tabs/photos-videos/photos-videos.component';
import {FileSizePipe} from '../../file-size.pipe';





@NgModule({
    declarations: [FileSizePipe,
        ProfileComponent,
        ProfileTimelineComponent,
        ProfilePhotosVideosComponent
    ],
    imports     : [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
