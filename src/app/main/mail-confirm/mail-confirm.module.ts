import { NgModule } from "@angular/core";

import { MatIconModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { MailConfirmComponent } from "./mail-confirm.component";
import { AppRoutingModule } from "../../app-routing.module";

@NgModule({
    declarations: [MailConfirmComponent],
    imports: [
        MatIconModule,
        FuseSharedModule,
        MatButtonModule,
        AppRoutingModule
    ]
})
export class MailConfirmModule {}
