import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowDetailsResponse } from 'src/app/models/tv-show-details.response.model';
import { TvShowDetailsService } from 'src/app/services/tv-show-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  image_url: string = environment.image_url;
  tvshowDetails: TvShowDetailsResponse | null = null;
  current_tab: string = "overview";
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private tvshowDetailsService: TvShowDetailsService,
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.isLoading = true;
        const tvshowId = params["tvshowId"];
        this.tvshowDetailsService.getTvShowDetails(tvshowId).subscribe(details => {
          this.tvshowDetails = details;
          // console.log(this.tvshowDetails);
          this.isLoading = false;
        })
      })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  ChangeTab(tab: string) {
    this.current_tab = tab;
  }

}
