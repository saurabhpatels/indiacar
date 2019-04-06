import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {ProfileService} from '../../profile.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import {computeMsgId} from '@angular/compiler/src/i18n/digest';


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
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: Observable<string>;
    yo: Observable<string>;
    isHovering: boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(private _profileService: ProfileService,
                private storage: AngularFireStorage,
                private authService: AuthService,
                private db: AngularFirestore)
    {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {

this.getphotos();
        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    startUpload(event: FileList): void {

        const file = event.item(0);
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :');
            return;
        }
        const path = 'test/';
        const customMetadata = { app: 'Saurabh Patel' };

        this.task = this.storage.upload(path, file, { customMetadata });
        this.percentage = this.task.percentageChanges();
        this.snapshot   = this.task.snapshotChanges().pipe(
            tap(snap => {
                if (snap.bytesTransferred === snap.totalBytes){
                   this.db.collection('photos').add({path, size: snap.totalBytes});
                   this.getphotos();

                }
            })
        );


    }
    isActive(snapshot): boolean {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }




    getphotos(): void {
        const storage = firebase.storage();
        const pathReference = storage.ref('test/');
        pathReference.getDownloadURL().then(url => {
            console.log('Download:', url);
            this.downloadURL = url;

        }).catch(function(error): void {
        });

    }

}
