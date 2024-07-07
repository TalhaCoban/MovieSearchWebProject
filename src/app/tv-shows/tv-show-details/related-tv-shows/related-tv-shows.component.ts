import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvShowsResponse } from 'src/app/models/tv-shows.response.model';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'related-tv-shows',
  templateUrl: './related-tv-shows.component.html',
  styleUrls: ['./related-tv-shows.component.css']
})
export class RelatedTvShowsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() tvshowId: number;
  image_url: string = environment.image_url;
  similar_tvshows: TvShowsResponse | null = null;
  current_tvshows_page: number = 1;
  private subscriptions: Subscription[] = [];

  constructor(private tvshowsService: TvShowsService) { }

  ngOnInit(): void {
    this.loadRelatedMovies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tvshowId'] && !changes['tvshowId'].isFirstChange()) {
      this.loadRelatedMovies();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadRelatedMovies(): void {
    this.tvshowsService.setMovieId(this.tvshowId);
    this.tvshowsService.setPage(this.current_tvshows_page);
    this.subscriptions.push(
      this.tvshowsService.current_tvshows.subscribe((data) => {
        this.similar_tvshows = data;
        this.current_tvshows_page = this.tvshowsService.getPage();
      })
    );
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.similar_tvshows?.total_pages || 0;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.current_tvshows_page - 1, this.current_tvshows_page, this.current_tvshows_page + 1, this.current_tvshows_page + 2, total - 2, total - 1, total];
    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < total) {
        result.push(i);
      }
    }
    return result;
  }

  PreviousPage() {
    if (this.current_tvshows_page > 1) {
      this.tvshowsService.PreviousPage();
    }
  }

  GetPage(page: number) {
    this.tvshowsService.setPage(page);
  }

  NextPage() {
    if (this.similar_tvshows && this.similar_tvshows.total_pages > this.current_tvshows_page) {
      this.tvshowsService.NextPage();
    }
  }
}