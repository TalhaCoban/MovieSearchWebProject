import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesResponse } from 'src/app/models/movies.response.model';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'related-movies',
  templateUrl: './related-movies.component.html',
  styleUrls: ['./related-movies.component.css']
})
export class RelatedMoviesComponent implements OnInit, OnDestroy, OnChanges {

  @Input() movieId: number;
  image_url: string = environment.image_url;
  similar_movies: MoviesResponse | null = null;
  current_movies_page: number = 1;
  private subscriptions: Subscription[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadRelatedMovies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId'] && !changes['movieId'].isFirstChange()) {
      this.loadRelatedMovies();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadRelatedMovies(): void {
    this.moviesService.setMovieId(this.movieId);
    this.moviesService.setPage(this.current_movies_page);
    this.subscriptions.push(
      this.moviesService.current_movies.subscribe((data) => {
        this.similar_movies = data;
        this.current_movies_page = this.moviesService.getPage();
      })
    );
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.similar_movies?.total_pages || 0;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.current_movies_page - 1, this.current_movies_page, this.current_movies_page + 1, this.current_movies_page + 2, total - 2, total - 1, total];
    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < total) {
        result.push(i);
      }
    }
    return result;
  }

  PreviousPage() {
    if (this.current_movies_page > 1) {
      this.moviesService.PreviousPage();
    }
  }

  GetPage(page: number) {
    this.moviesService.setPage(page);
  }

  NextPage() {
    if (this.similar_movies && this.similar_movies.total_pages > this.current_movies_page) {
      this.moviesService.NextPage();
    }
  }
}
