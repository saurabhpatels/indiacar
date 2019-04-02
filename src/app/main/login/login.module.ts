import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        AppRoutingModule
    ]
})
export class LoginModule {}
