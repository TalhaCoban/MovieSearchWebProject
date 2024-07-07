import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Crew, CastsCrews, CastsCrewsResponse } from "../models/casts-crews.response.model";

@Injectable({
    providedIn: "root"
})
export class MovieCastsService {

    movieCastsCrews_url: string[] = environment.movieCastsCrews_url;
    api: string = environment.api;

    headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient,
    ) {  }

    getMovieCasts(movieId: Number): Observable<CastsCrews> {
        const url: string = this.movieCastsCrews_url[0] + String(movieId) + this.movieCastsCrews_url[1]; 
        return this.http.get<CastsCrewsResponse>(url, { 'headers' : this.headers })
            .pipe(
                map(result => {

                    let directings: Crew[] = [];
                    let productors: Crew[] = [];
                    let writers: Crew[] = [];

                    for (let crew of result.crew ) {
                        if (crew.department == "Directing") {
                            directings.push(crew);
                        } else if (crew.department == "Production") {
                            productors.push(crew);
                        } else if (crew.department == "Writing") {
                            writers.push(crew);
                        }
                    }

                    const data: CastsCrews = {
                        id: result.id,
                        cast: result.cast,
                        directings: directings,
                        productors: productors,
                        writers: writers
                    }
                    return data
                }
            )
        );
    }
}