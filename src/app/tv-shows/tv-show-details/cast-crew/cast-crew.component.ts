import { Component, Input, OnInit } from '@angular/core';
import { CastsCrews } from 'src/app/models/casts-crews.response.model';
import { TvShowCastsService } from 'src/app/services/tv-show-casts.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'cast-crew',
  templateUrl: './cast-crew.component.html',
  styleUrls: ['./cast-crew.component.css']
})
export class CastCrewComponent implements OnInit {

  @Input() tvshowId: number;
  tvshowCastsCrews: CastsCrews | null = null;
  image_url = environment.image_url;
  constructor(
    private mtvshowCastsService: TvShowCastsService,
  ) { }

  ngOnInit(): void {
      this.mtvshowCastsService.getTvShowCasts(this.tvshowId).subscribe(casts => {
        this.tvshowCastsCrews = casts;
        // console.log("casts", this.tvshowCastsCrews);
      });
  }
}
