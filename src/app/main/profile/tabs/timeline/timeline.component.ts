import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {AuthService} from '../../../../auth.service';
import {DatePipe} from '@angular/common';
import {DataserviceService} from '../../../../data/dataservice.service';
@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [DatePipe]
})
export class ProfileTimelineComponent implements OnInit, OnDestroy {

    constructor(private authService: AuthService, private dataservice: DataserviceService) {}

    ngOnInit(): void {
        this.dataservice.getPhotos();
    }
    ngOnDestroy(): void {}
}
