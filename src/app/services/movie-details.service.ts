import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MovieDetailsResponse } from "../models/movie-details.response";

@Injectable({
    providedIn: "root"
})
export class MovieDetailsService {

    api: string = environment.api;
    movieDetails_url: string[] = environment.movieDetails_url;

    private headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient,
    ) {  }

    getMovieDetails(movieId: number): Observable<MovieDetailsResponse> {
        const url: string = this.movieDetails_url[0] + String(movieId) + this.movieDetails_url[1];
        return this.http.get<MovieDetailsResponse>(url, { 'headers' : this.headers } )
    }


}