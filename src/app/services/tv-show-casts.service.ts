import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Crew, CastsCrews, CastsCrewsResponse } from "../models/casts-crews.response.model";

@Injectable({
    providedIn: "root"
})
export class TvShowCastsService {

    TvShowCastsCrews_url: string[] = environment.TvShowCastsCrews_url;
    api: string = environment.api;

    headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient,
    ) {  }

    getTvShowCasts(tvshowId: Number): Observable<CastsCrews> {
        const url: string = this.TvShowCastsCrews_url[0] + String(tvshowId) + this.TvShowCastsCrews_url[1]; 
        return this.http.get<CastsCrewsResponse>(url, { 'headers' : this.headers })
            .pipe(
                map(result => {

                    let directings: Crew[] = [];
                    let productors: Crew[] = [];
                    let writers: Crew[] = [];

                    for (let crew of result.crew ) {
                        if (crew.known_for_department == "Directing") {
                            directings.push(crew);
                        } else if (crew.known_for_department == "Production") {
                            productors.push(crew);
                        } else if (crew.known_for_department == "Writing") {
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