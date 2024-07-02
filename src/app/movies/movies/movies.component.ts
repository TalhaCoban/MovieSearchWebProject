import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { MoviesResponse } from 'src/app/models/movies.response.model';
import { MovieService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {

  image_url = environment.image_url
  current_movies: MoviesResponse | null = null;
  current_title: string = "now_playing";
  current_movies_page: number = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.current_movies.subscribe((data) => {
      this.current_movies = data;
      this.current_movies_page = this.movieService.getPage();
      console.log(this.current_movies)
    })
  }


  changeFilmList(movie_kind: string): void {
    if (movie_kind == 'now_playing') {
      this.movieService.setCategory("now_playing");
      this.current_title = "now_playing";
    } else if(movie_kind == 'popular') {
      this.movieService.setCategory("popular");
      this.current_title = "popular";
    } else if(movie_kind == 'top_rated') {
      this.movieService.setCategory("top_rated");
      this.current_title = "top_rated";
    } else if(movie_kind == 'Upcoming') {
      this.movieService.setCategory("Upcoming");
      this.current_title = "Upcoming";
    }
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let array: number[] = [1,2,3,4, this.current_movies_page-1, this.current_movies_page, this.current_movies_page+1, this.current_movies_page+2, this.current_movies.total_pages-2, this.current_movies.total_pages-1, this.current_movies.total_pages]

    for (let i of array) {
      if ( !result.includes(i) && i != 0 && Math.max(...result) < i && i < this.current_movies.total_pages ) {
        result.push(i);
      }
    }
    return result;
  }

  PreviousPage() { 
    if ( 1 < this.current_movies_page){
      this.movieService.PreviousPage() 
    }
  }
  
  GetPage(page: number) { this.movieService.setPage(page) }

  NextPage() {
    if (this.current_movies.total_pages > this.current_movies_page){
      this.movieService.NextPage() 
    }
  }


}
