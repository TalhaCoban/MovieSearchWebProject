import { NgModule } from "@angular/core";
import { PersonDetailsComponent } from './person-details/person-details.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shrared.module";
import { RouterModule } from "@angular/router";
import { MediaComponent } from './person-details/media/media.component';
import { FilmographyComponent } from './person-details/filmography/filmography.component';
import { OverviewComponent } from './person-details/overview/overview.component';
import { TvshowraphyComponent } from './person-details/tvshowraphy/tvshowraphy.component';
import { PeopleComponent } from './people/people.component';

@NgModule({
    declarations: [
        PersonDetailsComponent,
        MediaComponent,
        FilmographyComponent,
        OverviewComponent,
        TvshowraphyComponent,
        PeopleComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: ":page", component: PeopleComponent },
            { path: "person/:personId", component: PersonDetailsComponent }
        ])
    ],
    exports: []
})
export class Peoplemodule {

}