import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Movie, MoviesResponse } from "../models/movies.response.model";
import { TvShow, TvShowsResponse } from "../models/tv-shows.response.model";
import { PeopleResponse } from "../models/people.response.model";
import { MovieGenreRepository, TvShowsGenreRepository } from "../models/genres.repository";

@Injectable({
    providedIn: "root"
})
export class SearchService {

    search_url: string[] = environment.search_url;
    api: string = environment.api;

    headers = new HttpHeaders({
        "accept": "application/json",
        "Authorization": "Bearer " + this.api
    })

    constructor(
        private http: HttpClient,
        private movieGenreRepository: MovieGenreRepository,
        private tvshowGenreRepository: TvShowsGenreRepository
    ) {}

    SearchMovies(search_in: string, search_key: string): Observable<MoviesResponse> {
        const url: string = this.search_url[0] + search_in + "?query=" + search_key + this.search_url[1];
        return this.http.get<MoviesResponse>( url, { headers: this.headers }).pipe(
            map(response => {
                const data: Movie[] = [];
                for (let row_data of response.results) {
                    const movie = row_data;
                    const genres: string[] = [];
                    if (row_data.backdrop_path) {
                        for (let genre of row_data.genre_ids) {
                            genres.push(this.movieGenreRepository.getGenre(Number(genre)));
                        }
                        data.push({ ...movie, genre_ids: genres });
                    }
                }
                return {
                    page: response.page,
                    results: data,
                    total_pages: response.total_pages,
                    total_results: response.total_results
                };
            })
        );
    }

    SearchTvShows(search_in: string, search_key: string): Observable<TvShowsResponse> {
        const url: string = this.search_url[0] + search_in + "?query=" + search_key + this.search_url[1];
        return this.http.get<TvShowsResponse>( url, { headers: this.headers }).pipe(
            map(response => {
                const data: TvShow[] = [];
                for (let row_data of response.results) {
                    const tvshow = row_data;
                    const genres: string[] = [];
                    if (row_data.backdrop_path) {
                        for (let genre of row_data.genre_ids) {
                            genres.push(this.tvshowGenreRepository.getGenre(Number(genre)));
                        }
                        data.push({ ...tvshow, genre_ids: genres });
                    }
                }
                return {
                    page: response.page,
                    results: data,
                    total_pages: response.total_pages,
                    total_results: response.total_results
                };
            })
        );
    }

    SearchPeople(search_in: string, search_key: string): Observable<PeopleResponse> {
        const url: string = this.search_url[0] + search_in + "?query=" + search_key + this.search_url[1];
        return this.http.get<PeopleResponse>( url, { headers: this.headers })
    }
}