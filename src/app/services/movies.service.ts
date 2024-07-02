import { effect, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    api: string = environment.api;
    url: string = "";

    current_movies = new Subject<MoviesResponse>;
    private categorySignal: WritableSignal<string> = signal('now_playing');
    private pageSignal: WritableSignal<number> = signal(1);
    
    private headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.api
    });

    constructor(
        private http: HttpClient,
        private genreRepository: GenreRepository,
    ) {
        effect(() => {
            let subscriber: Observable<MoviesResponse>;
            if (this.categorySignal() == "now_playing") {
                subscriber = this.getNowPlayingMovies(this.pageSignal())
            } else if (this.categorySignal() == "popular") {
                subscriber = this.getPopularMovies(this.pageSignal())
            } else if (this.categorySignal() == "top_rated") {
                subscriber = this.gettopRatedMovies(this.pageSignal())
            } else if (this.categorySignal() == "Upcoming") {
                subscriber = this.getUpcomingMovies(this.pageSignal())
            }
            subscriber.subscribe(data => {
                this.current_movies.next(data);
            });
        })
    }

    getCategory() { return this.categorySignal() };

    getPage() { return this.pageSignal() };

    PreviousPage() {
        this.pageSignal.update((page) => (page - 1));
    };

    setPage(page: number) {
        this.pageSignal.set(page);
    };

    NextPage() {
        this.pageSignal.update((page) => (page + 1));
    };

    setCategory(category: string) {
        this.categorySignal.set(category);
        this.pageSignal.set(1); 
    };

    getUpcomingMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.upcoming_url + page);
    };

    getTrendingMovies(): Observable<MoviesResponse> {
        return this.getMovies(this.trending_url);
    };

    getPopularMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.popular_url + page);
    };

    gettopRatedMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.topRated_url + page);
    };

    getNowPlayingMovies(page: number): Observable<MoviesResponse> {
        return this.getMovies(this.nowPlaying_url + page);
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
