import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { TvShowDetailsResponse } from "../models/tv-show-details.response.model";

@Injectable({
    providedIn: 'root'
})
export class TvShowDetailsService {

    tvshowDetails_url: string[] = environment.tvshowDetails_url;
    api: string = environment.api;
    country_url: string = "https://restcountries.com/v3.1/alpha/";

    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })

    constructor(
        private http: HttpClient,
    ) {}

    getTvShowDetails(tvshowId: number): Observable<TvShowDetailsResponse> {
        const url: string = this.tvshowDetails_url[0] + String(tvshowId) + this.tvshowDetails_url[1];
        return this.http.get<TvShowDetailsResponse>(url, { headers: this.headers }).pipe(
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