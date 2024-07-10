import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { PeopleResponse } from "../models/people.response.model";

@Injectable({
    providedIn: "root"
})
export class PeopleService {

    celebrities_url: string = environment.celebrities_url;
    api: string = environment.api;

    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })

    constructor(
        private http: HttpClient
    ) {}

    getCelebritiesList(current_page: number): Observable<PeopleResponse> {
        return this.http.get<PeopleResponse>( this.celebrities_url + current_page, { headers: this.headers });
    }
}