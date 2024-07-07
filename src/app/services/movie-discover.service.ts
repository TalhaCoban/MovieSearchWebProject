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

    getMovies(): Observable<MoviesResponse> {
        return this.http.get<MoviesResponse>(this.moviesDiscover_url, { headers: this.headers }).pipe(
            tap(data => console.log(data))
        )
    }
}