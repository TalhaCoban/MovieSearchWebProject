import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SearchResultComponent } from './search-result/search-result.component';


const routes: Routes = [{
    path: "search",
    children: [
        { path: ":search_in/:search_key", component: SearchResultComponent }
    ]
}]

@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        SearchResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent
    ]
})
export class SharedModule {

}