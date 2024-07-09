
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesResponse } from 'src/app/models/movies.response.model';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {

  image_url = environment.image_url;
  current_movies: MoviesResponse | null = null;
  current_title: string;
  current_movies_page: number;
  isLoading: boolean = true;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.current_title = params["category"];
      this.current_movies_page = params["page"];

      if (!this.current_movies_page) {
        this.current_movies_page == 1;
      }
      this.current_movies_page = +this.current_movies_page

      if (!this.current_title || this.current_title == "nowplaying") {
        this.current_title = "nowplaying";
        this.moviesService.getNowPlayingMovies(this.current_movies_page).subscribe(movies => {
          this.current_movies = movies;
          this.isLoading = false;
        });
      } else if (this.current_title == "popular") {
        this.current_title = "popular";
        this.moviesService.getPopularMovies(this.current_movies_page).subscribe(movies => {
          this.current_movies = movies;
          this.isLoading = false;
        });
      } else if (this.current_title == "toprated") {
        this.current_title = "toprated";
        this.moviesService.getTopRatedMovies(this.current_movies_page).subscribe(movies => {
          this.current_movies = movies;
          this.isLoading = false;
        });
      } else if (this.current_title == "upcoming") {
        this.current_title = "upcoming";
        this.moviesService.getUpcomingMovies(this.current_movies_page).subscribe(movies => {
          this.current_movies = movies;
          this.isLoading = false;
        });
      }

    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.current_movies.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1,2,3,4, this.current_movies_page-1, this.current_movies_page, this.current_movies_page+1, this.current_movies_page+2, total-2, total-1, total]

    for (let i of array) {
      if ( !result.includes(i) && i != 0 && Math.max(...result) < i && i < total ) {
        result.push(i);
      }
    }
    return result;
  }

}

