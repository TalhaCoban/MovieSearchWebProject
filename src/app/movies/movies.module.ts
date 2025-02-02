import { NgModule } from "@angular/core";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { MoviesComponent } from "./movies/movies.component";
import { SharedModule } from "../shared/shrared.module";
import { ReviewsComponent } from './movie-details/reviews/reviews.component';
import { OverviewComponent } from './movie-details/overview/overview.component';
import { CastCrewComponent } from './movie-details/cast-crew/cast-crew.component';
import { MediaComponent } from './movie-details/media/media.component';
import { RelatedMoviesComponent } from './movie-details/related-movies/related-movies.component';
import { DiscoverMoviesComponent } from "./movies/discover-movies/discover-movies.component";
import { FormsModule } from "@angular/forms";


const routes: Routes = [{
    path: 'movies',
    children: [
        { path: "", component: MoviesComponent },
        { path: "discover", component: DiscoverMoviesComponent },
        { path: ":category/:page", component: MoviesComponent },
        { path: ":movieId", component: MovieDetailsComponent },
    ]
}]

@NgModule({
    declarations: [
        MoviesComponent,
        MovieDetailsComponent,
        ReviewsComponent,
        OverviewComponent,
        CastCrewComponent,
        MediaComponent,
        RelatedMoviesComponent,
        DiscoverMoviesComponent
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
export class MoviesModule {

}

