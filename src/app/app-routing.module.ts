import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from './main/bookings/bookings.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {ForgotPasswordComponent} from './main/forgot-password/forgot-password.component';
import {SecureInnerPagesGuard} from './shared/guard/secure-inner-pages.guard';
import {LoginComponent} from './main/login/login.component';
import {DriversComponent} from './main/drivers/drivers.component';
import {UsersComponent} from './main/users/users.component';
import {SampleComponent} from './main/sample/sample.component';
import {MailConfirmComponent} from './main/mail-confirm/mail-confirm.component';
import {RegisterComponent} from './main/register/register.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ProfileComponent} from './main/profile/profile.component';



const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
    {path: 'mail-confirm', component: MailConfirmComponent, canActivate: [SecureInnerPagesGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]},
    {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
    {path: 'drivers', component: DriversComponent, canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'sample', component: SampleComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}


];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes), CommonModule,
        SlimLoadingBarModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
