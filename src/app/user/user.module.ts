import { NgModule } from "@angular/core";
import { AccountComponent } from "./account/account.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shrared.module";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [{
    path: "account",
    children: [
        { path: ":kind/:page", component: AccountComponent, canActivate: [AuthGuard] },
    ]
}]

@NgModule({
    declarations: [
        AccountComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class UserModule {

}