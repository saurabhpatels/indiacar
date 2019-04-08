import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {ProfileService} from '../../profile.service';
import {Observable, Subject} from 'rxjs';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AuthService} from '../../../../auth.service';
import {tap} from 'rxjs/internal/operators/tap';
import {AngularFirestore} from '@angular/fire/firestore';
import {DatePipe} from '@angular/common';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [DatePipe]
})


export class ProfileTimelineComponent implements OnInit, OnDestroy {
    photolist: Observable<any[]>;
    timeline: any;
    photo;
    file: any;
    filename: any;
    ref: any;

    photobio = null;
    private _unsubscribeAll: Subject<any>;
    private uploadProgress: Observable<number>;
    private uploadState: Observable<string>;
    task: AngularFireUploadTask;
    private snapshot: Observable<any>;
    downloadURL: Observable<string>;
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    color = 'black';


    constructor(private _profileService: ProfileService,
                private afStorage: AngularFireStorage,
                private authService: AuthService,
                private db: AngularFirestore,
                private datePipe: DatePipe,
                private Db: AngularFireDatabase) {
        this.itemsRef = Db.list('photos');
        this.items = Db.list('photos').valueChanges();

        this.items = this.itemsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );

        this._unsubscribeAll = new Subject();
    }


    startUpload(event: FileList, photobio): void {
        this.file = event.item(0);
        if (this.file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :');
            return;
        }
        this.filename = this.file.name.slice(0, 9);
        const filePath = `${new Date().getTime()}_${this.filename}`;
        const customMetadata = {app: 'My AngularFire-powered PWA!', content: photobio};
        this.ref = this.afStorage.ref(filePath);
        this.task = this.afStorage.upload(filePath, this.file, {customMetadata});
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
        this.task.snapshotChanges().pipe(finalize(() => this.downloadURL = this.ref.getDownloadURL())).subscribe();
        this.snapshot = this.task.snapshotChanges().pipe(tap(snap => {

            if (snap.bytesTransferred === snap.totalBytes) {

            }
        }));
    }
    save(url) {
        if (url === '') {}
        else {
            this.itemsRef.push({url: url, bio: this.photobio});
        }

    }
    deleteItem(key: string, url: string) {
        this.itemsRef.remove(key);
        this.afStorage.storage.refFromURL(url).delete();
    }



    ngOnInit(): void {


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
}
