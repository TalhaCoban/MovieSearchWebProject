import { NgModule } from "@angular/core";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { MoviesComponent } from "./movies/movies.component";
import { SharedModule } from "../shared/shrared.module";


@NgModule({
    declarations: [
        MoviesComponent,
        MovieDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: MoviesComponent },
            { path: ":movieId", component: MovieDetailsComponent },

        ]),
        HttpClientModule,
        SharedModule,
    ],
    exports: [
        MoviesComponent,
        MovieDetailsComponent,
    ]
})
export class MoviesModule {

}