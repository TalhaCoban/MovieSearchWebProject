import { Component, Input, OnInit } from '@angular/core';
import { Season } from 'src/app/models/tv-show-details.response.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  @Input() seasons: Season[];
  image_url = environment.image_url;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.seasons)
  }

}
