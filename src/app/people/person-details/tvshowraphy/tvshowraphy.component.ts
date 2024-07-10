import { Component, Input, OnInit } from '@angular/core';
import { CreditTvShows } from 'src/app/models/person-tv-shows.response.model';
import { CreditService } from 'src/app/services/person-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'tvshowraphy',
  templateUrl: './tvshowraphy.component.html',
  styleUrls: ['./tvshowraphy.component.css']
})
export class TvshowraphyComponent implements OnInit {

  @Input() personId: number;
  tvshows: CreditTvShows;
  image_url: string = environment.image_url;

  constructor(
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.creditService.getCreditTvShows(this.personId).subscribe(tvshows => {
      this.tvshows = tvshows;
      console.log("tvshows", this.tvshows)
    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }
}
