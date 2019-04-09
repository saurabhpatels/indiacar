import { NgModule } from '@angular/core';
import {MatButtonModule, MatDividerModule, MatIconModule, MatProgressBarModule, MatTabsModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileService } from './profile.service';
import {ProfileTimelineComponent} from './tabs/timeline/timeline.component';
import {ProfileComponent} from './profile.component';
import {ProfilePhotosVideosComponent} from './tabs/photos-videos/photos-videos.component';
import {FileSizePipe} from '../../file-size.pipe';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';
import {TimeAgoPipe} from 'time-ago-pipe';
import { NgxMasonryModule } from 'ngx-masonry';



@NgModule({

    declarations: [FileSizePipe,
        ProfileComponent,
        ProfileTimelineComponent,
        ProfilePhotosVideosComponent,
        TimeAgoPipe
    ],
    imports     : [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,
        AngularFireModule,
        AngularFireStorageModule,
        MatProgressBarModule,
        ToastrModule,
        NgxMasonryModule
    ],
    providers   : [
        ProfileService,

    ], exports: [
        NgxMasonryModule
    ]
})
export class ProfileModule
{
}
