import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GenreRepository } from "../models/genres.repository";
import { Movie, MoviesResponse } from "../models/movies.response.model";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    upcoming_url: string = environment.upcoming_url;
    trending_url: string = environment.trending_url;
    popular_url: string = environment.popular_url;
    topRated_url: string = environment.topRated_url;
    nowPlaying_url: string = environment.nowPlaying_url;
    moviesSimilar_url: string[] = environment.moviesSimilar_url;
    api: string = environment.api;
    url: string = "";
    movieId: number;

    current_movies = new Subject<MoviesResponse>;
    private page: number;

    private headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.api
    });

    constructor(
        private http: HttpClient,
        private genreRepository: GenreRepository,
    ) {

    }

    getPage() { return this.page };

    setMovieId(movieId: number): void {
        this.movieId = movieId;
        this.fetchSimilarMovies();
    }

    setPage(page: number) {
        this.page = page;
        this.fetchSimilarMovies();
    }

    PreviousPage() {
        this.page--;
        this.fetchSimilarMovies();
    }

    NextPage() {
        this.page++;
        this.fetchSimilarMovies();
    }

    private fetchSimilarMovies() {
        if (!this.movieId || !this.page) {
            return;
        }
        this.getSimilarMovies(this.movieId, this.page).subscribe({
            next: (data) => {
                this.current_movies.next(data);
            },
            error: (err) => console.error("Error fetching similar movies:", err)
        });
    }

    getUpcomingMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.upcoming_url + page);
    };

    getTrendingMovies(): Observable<MoviesResponse> {
        return this.getMovies(this.trending_url);
    };

    getPopularMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.popular_url + page);
    };

    getTopRatedMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.topRated_url + page);
    };

    getNowPlayingMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.nowPlaying_url + page);
    };

    getSimilarMovies(movieId: number, page: number): Observable<MoviesResponse> {
        let url = this.moviesSimilar_url[0] + String(movieId) + this.moviesSimilar_url[1] + String(page);
        return this.getMovies(url).pipe(tap(data => console.log(data)));
    };

    private getMovies(url: string): Observable<MoviesResponse> {
        return this.http.get<MoviesResponse>(url, { headers: this.headers })
            .pipe(
                map(response => {
                    const data: Movie[] = [];
                    for (let row_data of response.results) {
                        const movie = row_data;
                        const genres: string[] = [];
                        for (let genre of row_data.genre_ids) {
                            genres.push(this.genreRepository.getGenre(Number(genre)));
                        }
                        data.push({ ...movie, genre_ids: genres });
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
