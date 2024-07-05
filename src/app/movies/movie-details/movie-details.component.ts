import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/models/movie-details.response';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  image_url = environment.image_url;
  movieDetails: MovieDetailsResponse | null = null;
  current_tab: string = "overview";

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
  ) {  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.movieDetailsService.getMovieDetails(params['movieId']).subscribe(data => {
          this.movieDetails = data;
          // console.log("movie_details", data)
        });
      })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  ChangeTab(tab: string) {
    this.current_tab = tab;
  }

}
