import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {ProfileService} from '../../profile.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../../auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileTimelineComponent implements OnInit, OnDestroy {
    timeline: any;
    photo;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private authService: AuthService,
        private db: AngularFireDatabase
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onFileSelected(event: any) {
       const file: File = event.target.files[0];
       console.log(file);
       const metaData = {'contentType': file.type} ;
       const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/1');
        storageRef.put(file , metaData);
        console.log('uploading', file);
    }

    onUpload() {

    }
}
