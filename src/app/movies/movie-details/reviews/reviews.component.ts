import { Component, Input, OnInit } from '@angular/core';
import { ReviewsResponse } from 'src/app/models/reviews.response.model';
import { MovieReviewsService } from 'src/app/services/movie-reviews.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() movieId: number;

  image_url: string = environment.image_url;
  movie_reviews: ReviewsResponse | null = null;

  constructor(
    private movieReviewsService: MovieReviewsService,
  ) {  }

  ngOnInit(): void {
      this.movieReviewsService.getMovieReviews(this.movieId, 1).subscribe(reviews => {
        this.movie_reviews = reviews;
        // console.log("reviews", reviews);
      })
  }

  getRatingArray(rating: number): number[] {
    return [...Array(rating).keys() ];
  }

}
