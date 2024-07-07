import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MovieDetailsResponse } from "../models/movie-details.response.model";

@Injectable({
    providedIn: "root"
})
export class MovieDetailsService {

    api: string = environment.api;
    movieDetails_url: string[] = environment.movieDetails_url;
    country_url: string = "https://restcountries.com/v3.1/alpha/";

    private headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient,
    ) {  }

    getMovieDetails(movieId: number): Observable<MovieDetailsResponse> {
        const url: string = this.movieDetails_url[0] + String(movieId) + this.movieDetails_url[1];
        return this.http.get<MovieDetailsResponse>(url, { 'headers' : this.headers } ).pipe(
            map(result => {
                for (let i in result.production_countries) {
                    let country_data = result.production_countries[i];
                    this.http.get(this.country_url + country_data.iso_3166_1).subscribe(country => {
                        let country_flag = country[0].flags.png;
                        if (country_flag) {
                            result.production_countries[i].flag_path = country_flag;
                        } 
                    })
                }
                return result;
            })
        );
    }


}