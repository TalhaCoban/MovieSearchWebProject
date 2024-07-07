import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MoviesResponse } from "../models/movies.response.model";


@Injectable({
    providedIn: "root"
})
export class DiscoverMoviesService {

    moviesDiscover_url: string = environment.moviesDiscover_url;
    api: string = environment.api;


    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })
    
    constructor(
        private http: HttpClient,
    ) {}

    getMovies(query?: string): Observable<MoviesResponse> {
        let url: string;
        if (query) {
            url = query;
        } else {
            url = this.moviesDiscover_url;
        }
        console.log(url)
        return this.http.get<MoviesResponse>( url, { headers: this.headers }).pipe(
            tap(data => console.log(data))
        )
    }
}