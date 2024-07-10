import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { CreditResponse } from "../models/person.response.model";
import { CreditImagesResponse } from "../models/person-image.response.model";
import { CreditMovies } from "../models/person-movies.response.model";
import { CreditTvShows } from "../models/person-tv-shows.response.model";


@Injectable({
    providedIn: "root"
})
export class CreditService {

    credit_url: string[] = environment.credit_url;
    creditImages_url: string[] = environment.creditImages_url;
    creditMovies_url: string[] = environment.creditMovies_url;
    creditTvShows_url: string[] = environment.creditTvShows_url;
    api: string = environment.api;

    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })

    constructor(
        private http: HttpClient
    ) {}

    getCreditDetails(personId: number): Observable<CreditResponse> {
        const url: string = this.credit_url[0] + String(personId) + this.credit_url[1];
        return this.http.get<CreditResponse>( url, { headers: this.headers } );
    }

    getCreditImages(personId: number): Observable<CreditImagesResponse> {
        const url: string = this.creditImages_url[0] + String(personId) + this.creditImages_url[1];
        return this.http.get<CreditImagesResponse>( url, { headers: this.headers } );
    }

    getCreditMovies(personId: number): Observable<CreditMovies> {
        const url: string = this.creditMovies_url[0] + String(personId) + this.creditMovies_url[1];
        return this.http.get<CreditMovies>( url, { headers: this.headers } );
    }

    getCreditTvShows(personId: number): Observable<CreditTvShows> {
        const url: string = this.creditTvShows_url[0] + String(personId) + this.creditTvShows_url[1];
        return this.http.get<CreditTvShows>( url, { headers: this.headers } );
    }
}