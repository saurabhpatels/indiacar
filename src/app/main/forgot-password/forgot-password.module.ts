import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AppRoutingModule } from '../../app-routing.module';
@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        AppRoutingModule
    ]
})
export class ForgotPasswordModule {}
