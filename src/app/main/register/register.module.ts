import { NgModule } from "@angular/core";

import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";
import { RegisterComponent } from "./register.component";
import { AppRoutingModule } from "../../app-routing.module";

@NgModule({
    declarations: [RegisterComponent],
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
export class RegisterModule {}
