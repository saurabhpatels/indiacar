import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {DataserviceService} from '../../../../data/dataservice.service';
import {Observable} from 'rxjs';



@Component({
    selector     : 'profile-photos-videos',
    templateUrl  : './photos-videos.component.html',
    styleUrls    : ['./photos-videos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit, OnDestroy
{   items: Observable<any[]>;
    constructor(private dataservice: DataserviceService ){}
    ngOnInit(): void {
      this.dataservice.getPhotos();
    }
    ngOnDestroy(): void {}
}
