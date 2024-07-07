import { Component, Input, OnInit } from '@angular/core';
import { TvShowDetailsResponse } from 'src/app/models/tv-show-details.response.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  flag_url: string;
  image_url: string = environment.image_url;
  @Input() details: TvShowDetailsResponse;

  constructor(

  ) {  }

  ngOnInit(): void {

  }

}
