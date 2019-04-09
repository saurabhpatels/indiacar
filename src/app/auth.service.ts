import {Injectable, NgZone} from '@angular/core';
import {User} from './shared/services/user';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any; // Save logged in user data

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        private toastr: ToastrService
    ) {

        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {

                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['sample']);
                    this.toastr.success('SuccessFully Logged In!', 'Welcome', {
                        timeOut: 1000
                    });
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                this.toastr.warning(error.message, 'Error');
            });
    }

    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result.user);
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                this.SendVerificationMail();
                this.toastr.info('Please Check Your Email', 'Reminder', {
                    timeOut: 3000
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['mail-confirm']);
            });
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.toastr.info('Password Reset Email Sent, Check Your Inbox.', 'Reminder', {
                    timeOut: 3000
                });

            }).catch((error) => {
                this.toastr.error('Invalid Email', 'Error', {
                    timeOut: 3000
                });
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
            return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result.user);
                this.ngZone.run(() => {
                    this.toastr.success('SuccessFully Logged In!', 'Welcome', {
                        timeOut: 1000
                    });
                    this.router.navigate(['sample']);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                this.toastr.error(error, 'Error');
            });
    }

    /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,

        };
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign out
    SignOut() {
        console.log('logout');
        return this.afAuth.auth.signOut().then(() => {
            this.toastr.success('Logging Out!', 'Wait', {
                timeOut: 1000,
                progressBar: false,
                closeButton: false,
            });
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

}
