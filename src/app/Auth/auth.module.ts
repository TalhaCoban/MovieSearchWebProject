import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shrared.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { PwResetComponent } from './pw-reset/pw-reset.component';


const routes: Routes = [{
    path: "auth",
    children: [
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent },
        { path: "pw-reset", component: PwResetComponent }
    ]
}]


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        PwResetComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class AuthModule {

}