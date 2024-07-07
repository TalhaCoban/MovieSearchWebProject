import { Component, Input, OnInit } from '@angular/core';
import { MovieDetailsResponse } from 'src/app/models/movie-details.response.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  image_url: string = environment.image_url;
  @Input() details: MovieDetailsResponse;
  
  constructor() {  }

  ngOnInit(): void {
      
  }

}
