import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment.development";
import { TvShow, TvShowsResponse } from "../models/tv-shows.response.model";
import { TvShowsGenreRepository } from "../models/genres.repository";

@Injectable({
    providedIn: 'root'
})
export class TvShowsService {

    tvshowstrending_url: string = environment.tvshowstrending_url;
    tvshowsAiringToday_url: string = environment.tvshowsAiringToday_url;
    tvshowsOntheAir_url: string = environment.tvshowsOntheAir_url;
    tvshowspopular_url: string = environment.tvshowspopular_url;
    tvshowstopRated_url: string = environment.tvshowstopRated_url;
    tvshowsSimilar_url: string[] = environment.tvshowsSimilar_url;
    api: string = environment.api;
    url: string = "";
    tvshowId: number;

    current_tvshows = new Subject<TvShowsResponse>;
    private page: number;

    private headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.api
    });

    constructor(
        private http: HttpClient,
        private genreRepository: TvShowsGenreRepository,
    ) {

    }

    getPage() { return this.page };

    setMovieId(tvshowId: number): void {
        this.tvshowId = tvshowId;
        this.fetchSimilarTvShows();
    }

    setPage(page: number) {
        this.page = page;
        this.fetchSimilarTvShows();
    }

    PreviousPage() {
        this.page--;
        this.fetchSimilarTvShows();
    }

    NextPage() {
        this.page++;
        this.fetchSimilarTvShows();
    }

    private fetchSimilarTvShows() {
        if (!this.tvshowId || !this.page) {
            return;
        }
        this.getSimilarTvShows(this.tvshowId, this.page).subscribe({
            next: (data) => {
                this.current_tvshows.next(data);
            },
            error: (err) => console.error("Error fetching similar movies:", err)
        });
    }

    getTrendingTvShows(): Observable<TvShowsResponse> {
        return this.getTvShows(this.tvshowstrending_url);
    };

    getAiringTodayTvShows(page: number): Observable<TvShowsResponse> {
        return this.getTvShows(this.tvshowsAiringToday_url + page);
    };

    getOnTheAirTvShows(page: number): Observable<TvShowsResponse> {
        return this.getTvShows(this.tvshowsOntheAir_url + page);
    };

    getPopularTvShows(page: number): Observable<TvShowsResponse> {
        return this.getTvShows(this.tvshowspopular_url + page);
    };

    getTopRatedTvShows(page: number): Observable<TvShowsResponse> {
        return this.getTvShows(this.tvshowstopRated_url + page);
    };

    getSimilarTvShows(movieId: number, page: number): Observable<TvShowsResponse> {
        let url = this.tvshowsSimilar_url[0] + String(movieId) + this.tvshowsSimilar_url[1] + String(page);
        return this.getTvShows(url);
    };

    private getTvShows(url: string): Observable<TvShowsResponse> {
        return this.http.get<TvShowsResponse>(url, { headers: this.headers })
            .pipe(
                map(response => {
                    const data: TvShow[] = [];
                    for (let row_data of response.results) {
                        const tvshow = row_data;
                        const genres: string[] = [];
                        if (row_data.backdrop_path) {
                            for (let genre of row_data.genre_ids) {
                                genres.push(this.genreRepository.getGenre(Number(genre)));
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
    };
}
