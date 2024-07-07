import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TvShowsResponse } from 'src/app/models/tv-shows.response.model';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  
  image_url = environment.image_url;
  current_tvshows: TvShowsResponse | null = null;
  current_title: string;
  current_tvshows_page: number;
  isLoading: boolean = true;

  constructor(
    private tvshowService: TvShowsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.current_title = params["category"];
      this.current_tvshows_page = params["page"];

      if (!this.current_tvshows_page) {
        this.current_tvshows_page == 1;
      }
      this.current_tvshows_page = +this.current_tvshows_page;

      let subscriber: Observable<TvShowsResponse>;

      if (!this.current_title || this.current_title == "airingtoday") {
        this.current_title = "airingtoday";
        subscriber = this.tvshowService.getAiringTodayTvShows(this.current_tvshows_page);
      } else if (this.current_title == "airing") {
        this.current_title = "airing";
        subscriber = this.tvshowService.getOnTheAirTvShows(this.current_tvshows_page);
      } else if (this.current_title == "toprated") {
        this.current_title = "toprated";
        subscriber = this.tvshowService.getTopRatedTvShows(this.current_tvshows_page);
      } else if (this.current_title == "popular") {
        this.current_title = "popular";
        subscriber = this.tvshowService.getPopularTvShows(this.current_tvshows_page);
      }

      subscriber.subscribe(data => {
        this.current_tvshows = data;
        this.isLoading = false;
      });
    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.current_tvshows.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.current_tvshows_page - 1, this.current_tvshows_page, this.current_tvshows_page + 1, this.current_tvshows_page + 2, total - 2, total - 1, total]

    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < total) {
        result.push(i);
      }
    }
    return result;
  }
}
