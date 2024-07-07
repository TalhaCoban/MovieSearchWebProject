import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ReviewsResponse } from "../models/reviews.response.model";

@Injectable({
    providedIn: "root"
})
export class TvShowReviewsService {

    tvshowReviews_url = environment.tvshowReviews_url;
    api = environment.api;

    headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient
    ) {}

    getTvShowReviews(movieId:number, page: number): Observable<ReviewsResponse> {
        const url: string = this.tvshowReviews_url[0] + String(movieId) + this.tvshowReviews_url[1] + String(page);
        return this.http.get<ReviewsResponse>(url, { "headers" : this.headers })
    }
}