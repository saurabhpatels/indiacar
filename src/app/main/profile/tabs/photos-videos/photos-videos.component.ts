import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {DataserviceService} from '../../../../data/dataservice.service';
import {Observable} from 'rxjs';
import {NgxMasonryOptions} from 'ngx-masonry';


@Component({
    selector: 'profile-photos-videos',
    templateUrl: './photos-videos.component.html',
    styleUrls: ['./photos-videos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit, OnDestroy {

    public masonryOptions: NgxMasonryOptions = {
        transitionDuration: '0.2s',
        gutter: 50,
        fitWidth: false, //
        columnWidth: 20,
        percentPosition: false};
    constructor(private dataservice: DataserviceService) {}

    ngOnInit(): void {
        this.dataservice.getPhotos();

    }


    ngOnDestroy(): void {
    }
}
