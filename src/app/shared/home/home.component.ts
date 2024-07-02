import { Component, OnInit } from '@angular/core';
import { MoviesResponse } from '../../models/movies.response.model';
import { environment } from 'src/environments/environment.development';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {

  image_url: string = environment.image_url;
  popular_current_index: number = 20;
  trending_current_index: number = 20;
  upcoming_movies: MoviesResponse | null = null;
  popular_movies: MoviesResponse | null = null;
  trending_movies: MoviesResponse | null = null;

  constructor(
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
      this.movieService.getUpcomingMovies(1).subscribe({
        next: (movies) => {
          this.upcoming_movies = movies
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.movieService.getPopularMovies(1).subscribe({
        next: (movies) => {
          this.popular_movies = movies
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.movieService.getTrendingMovies().subscribe({
        next: (movies) => {
          this.trending_movies = movies
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  upcoming_previous() {
    if (this.popular_current_index != 1) {
      this.popular_current_index--;
    }
  }

  upcoming_next() {
    if (this.popular_current_index != 20) {
      this.popular_current_index++;
    }
  }

  trending_previous() {
    if (this.trending_current_index != 1) {
      this.trending_current_index--;
    }
  }

  trending_next() {
    if (this.trending_current_index != 20) {
      this.trending_current_index++;
    }
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }
}

