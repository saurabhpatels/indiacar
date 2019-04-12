import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
    AngularFireStorage,
    AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataserviceService {
    itemsRef: AngularFireList<any>;
    task: AngularFireUploadTask;

    today: number;
    deletestatus: any;
    file: any;
    filename: any;
    ref: any;
    photobio = null;

    items: Observable<any[]>;
    uploadProgress: Observable<number>;
    uploadState: Observable<string>;
    snapshot: Observable<any>;
    downloadURL: Observable<string>;

    @ViewChild('fileinput')
    fileinput: ElementRef;

    constructor(
        private authService: AuthService,
        private Db: AngularFireDatabase,
        private toastr: ToastrService,
        private afStorage: AngularFireStorage
    ) {
        this.itemsRef = this.Db.list('photos');
        this.items = this.Db.list('photos').valueChanges();
    }

    getPhotos = () => {
        return this.itemsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({
                    key: c.payload.key,
                    ...c.payload.val()
                }))
            )
        );
    };

    savePhotos = (url, bio) => {
        if (url == null) {
            this.toastr.info(
                'Wait I am Getting Your Things Done',
                'Downloading',
                {
                    timeOut: 3000
                }
            );
        } else {
            this.today = Date.now();

            this.itemsRef.push({
                url: url,
                bio: bio,
                date: this.today,
                author: this.authService.userData.displayName,
                authorImg: this.authService.userData.photoURL
            });

            this.toastr.success('Photos Saved', 'Saved', {
                timeOut: 3000
            });
        }
    };

    deletePhotos = (key, url) => {
        this.itemsRef.remove(key);
        this.deletestatus = this.afStorage.storage
            .refFromURL(url)
            .delete()
            .then(() => true)
            .catch(error => error);
        if (this.deletestatus) {
            this.toastr.success('Image Deleted', 'Deleted', {
                timeOut: 3000
            });
        } else {
            this.toastr.success(this.deletestatus, 'Error', {
                timeOut: 3000
            });
        }
    };

    uploadPhoto(event: FileList, photobio): void {
        this.file = event.item(0);
        if (this.file.type.split('/')[0] !== 'image') {
            this.toastr.warning(
                'UnSuppported File',
                'Please Select Image File',
                {
                    timeOut: 1000
                }
            );
        } else {
            this.filename = this.file.name.slice(0, 9);
            const filePath = `${new Date().getTime()}_${this.filename}`;
            const customMetadata = {
                app: 'My AngularFire-powered PWA!',
                content: photobio
            };
            this.ref = this.afStorage.ref(filePath);
            this.task = this.afStorage.upload(filePath, this.file, {
                customMetadata
            });
            this.uploadProgress = this.task.percentageChanges();

            this.uploadState = this.task
                .snapshotChanges()
                .pipe(map(s => s.state));
            this.task
                .snapshotChanges()
                .pipe(
                    finalize(
                        () => (this.downloadURL = this.ref.getDownloadURL())
                    )
                )
                .subscribe();

            this.snapshot = this.task.snapshotChanges().pipe(
                tap(snap => {
                    if (snap.bytesTransferred === snap.totalBytes) {
                        this.toastr.success('Image Uploaded', 'Please Save ', {
                            timeOut: 1000
                        });
                    }
                })
            );
        }
    }
}
