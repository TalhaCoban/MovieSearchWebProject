import { Component, Input, OnInit } from '@angular/core';
import { ReviewsResponse } from 'src/app/models/reviews.response.model';
import { TvShowReviewsService } from 'src/app/services/tv-show-reviews.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() tvshowId: number;

  image_url: string = environment.image_url;
  tvshow_reviews: ReviewsResponse | null = null;

  constructor(
    private tvshowReviewsService: TvShowReviewsService,
  ) {  }

  ngOnInit(): void {
      this.tvshowReviewsService.getTvShowReviews(this.tvshowId, 1).subscribe(reviews => {
        this.tvshow_reviews = reviews;
        // console.log("reviews", reviews);
      })
  }

  getRatingArray(rating: number): number[] {
    return [...Array(rating).keys() ];
  }

}
