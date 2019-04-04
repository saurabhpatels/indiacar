import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';
import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';
import {fuseConfig} from 'app/fuse-config';
import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {SampleModule} from 'app/main/sample/sample.module';
import {UsersModule} from './main/users/users.module';
import {DriversModule} from './main/drivers/drivers.module';
import {BookingsModule} from './main/bookings/bookings.module';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {LoginModule} from './main/login/login.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {ForgotPasswordModule} from './main/forgot-password/forgot-password.module';
import {AuthService} from './auth.service';
import {RegisterModule} from './main/register/register.module';
import {MailConfirmModule} from './main/mail-confirm/mail-confirm.module';
import {AppRoutingModule} from './app-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        SlimLoadingBarModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // App modules
        LayoutModule,
        SampleModule,
        UsersModule,
        DriversModule,
        BookingsModule,
        LoginModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        ForgotPasswordModule,
        RegisterModule,
        MailConfirmModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({positionClass: 'toast-top-center', preventDuplicates: true, timeOut: 1500}),
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
