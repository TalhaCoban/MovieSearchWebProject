import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MovieReviewsResponse } from "../models/movie-reviews.response";

@Injectable({
    providedIn: "root"
})
export class MovieReviewsService {

    movieReviews_url = environment.movieReviews_url;
    api = environment.api;

    headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient
    ) {}

    getMovieReviews(movieId:number, page: number): Observable<MovieReviewsResponse> {
        const url: string = this.movieReviews_url[0] + String(movieId) + this.movieReviews_url[1] + String(page);
        return this.http.get<MovieReviewsResponse>(url, { "headers" : this.headers })
    }
}