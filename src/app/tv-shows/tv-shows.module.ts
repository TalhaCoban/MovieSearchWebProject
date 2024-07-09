import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shrared.module";
import { TvShowsComponent } from "./tv-shows/tv-shows.component";
import { TvShowDetailsComponent } from "./tv-show-details/tv-show-details.component";
import { OverviewComponent } from './tv-show-details/overview/overview.component';
import { ReviewsComponent } from './tv-show-details/reviews/reviews.component';
import { CastCrewComponent } from './tv-show-details/cast-crew/cast-crew.component';
import { MediaComponent } from './tv-show-details/media/media.component';
import { RelatedTvShowsComponent } from './tv-show-details/related-tv-shows/related-tv-shows.component';
import { SeasonsComponent } from './tv-show-details/seasons/seasons.component';
import { DiscoverTvShowsComponent } from './tv-shows/discover-tv-shows/discover-tv-shows.component';
import { FormsModule } from "@angular/forms";

const routes: Routes = [{
    path: "tv-shows",
    children : [
        { path: "", component: TvShowsComponent },
        { path: "discover", component: DiscoverTvShowsComponent },
        { path: ":category/:page", component: TvShowsComponent },
        { path: ":tvshowId", component: TvShowDetailsComponent },
    ]
}]

@NgModule({
    declarations: [
        TvShowsComponent,
        TvShowDetailsComponent,
        OverviewComponent,
        ReviewsComponent,
        CastCrewComponent,
        MediaComponent,
        RelatedTvShowsComponent,
        SeasonsComponent,
        DiscoverTvShowsComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    exports: []
})

export class TvShowsModule {

}