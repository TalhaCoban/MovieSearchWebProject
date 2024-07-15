import { Component, effect, OnInit } from '@angular/core';
import { MoviesResponse } from '../../models/movies.response.model';
import { environment } from 'src/environments/environment.development';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsResponse } from 'src/app/models/tv-shows.response.model';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { UserSubject } from 'src/app/services/user.subject';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MoviesService]
})
export class HomeComponent implements OnInit {

  image_url: string = environment.image_url;
  trending_movies_current_index: number = 20;
  popular_movies_current_index: number = 20;
  trending_tvshows_current_index: number = 20;
  popular_tvshows_current_index: number = 20;
  trending_movies: MoviesResponse | null = null;
  popular_movies: MoviesResponse | null = null;
  trending_tvshows: TvShowsResponse | null = null;
  popular_tvshows: TvShowsResponse | null = null;
  isLoading1: boolean = true;
  isLoading2: boolean = true;
  isLoading3: boolean = true;
  isLoading4: boolean = true;
  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private tvshowService: TvShowsService,
    private userSubject: UserSubject
  ) {
    effect(() => {
      this.isAuthenticated = !!this.userSubject.user();
      if (this.isAuthenticated) {
        this.username = this.userSubject.user().name;
      } else {
        this.username = null;
      }
    })
  }

  ngOnInit(): void {
      this.moviesService.getTrendingMovies().subscribe({
        next: (movies) => {
          this.trending_movies = movies;
          this.isLoading3 = false;
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.moviesService.getPopularMovies(1).subscribe({
        next: (movies) => {
          this.popular_movies = movies;
          this.isLoading2 = false;
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.tvshowService.getTrendingTvShows().subscribe({
        next: (tvshows) => {
          this.trending_tvshows = tvshows;
          this.isLoading1 = false;
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.tvshowService.getPopularTvShows(1).subscribe({
        next: (tvshows) => {
          this.popular_tvshows = tvshows;
          this.isLoading4 = false;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  // trending movies
  trending_movies_previous() {
    if (this.trending_movies_current_index != 1) {
      this.trending_movies_current_index--;
    }
  }

  trending_movies_next() {
    if (this.trending_movies_current_index != 20) {
      this.trending_movies_current_index++;
    }
  }

  // popular movies
  popular_movies_previous() {
    if (this.popular_movies_current_index != 1) {
      this.popular_movies_current_index--;
    }
  }

  popular_movies_next() {
    if (this.popular_movies_current_index != 20) {
      this.popular_movies_current_index++;
    }
  }

  // trending tvshows
  trending_tvshows_previous() {
    if (this.trending_tvshows_current_index != 1) {
      this.trending_tvshows_current_index--;
    }
  }

  trending_tvshows_next() {
    if (this.trending_tvshows_current_index != 20) {
      this.trending_tvshows_current_index++;
    }
  }

  // popular tvshows
  popular_tvshows_previous() {
    if (this.popular_tvshows_current_index != 1) {
      this.popular_tvshows_current_index--;
    }
  }

  popular_tvshows_next() {
    if (this.popular_tvshows_current_index != 20) {
      this.popular_tvshows_current_index++;
    }
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }
}

