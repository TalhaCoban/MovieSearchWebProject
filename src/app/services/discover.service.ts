import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MoviesResponse } from "../models/movies.response.model";
import { TvShowsResponse } from "../models/tv-shows.response.model";


@Injectable({
    providedIn: "root"
})
export class DiscoverService {

    api: string = environment.api;


    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })
    
    constructor(
        private http: HttpClient,
    ) {}

    getMovies(url: string): Observable<MoviesResponse> {
        return this.http.get<MoviesResponse>( url, { headers: this.headers });
    }

    getTvShows(url: string): Observable<TvShowsResponse> {
        return this.http.get<TvShowsResponse>( url, { headers: this.headers });
    }
}