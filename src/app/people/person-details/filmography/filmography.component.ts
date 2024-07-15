import { Component, Input, OnInit } from '@angular/core';
import { CreditMovies } from 'src/app/models/person-movies.response.model';
import { CreditService } from 'src/app/services/person-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'filmography',
  templateUrl: './filmography.component.html',
  styleUrls: ['./filmography.component.css']
})
export class FilmographyComponent implements OnInit {

  @Input() personId: number;
  movies: CreditMovies;
  image_url: string = environment.image_url;

  constructor(
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
      this.creditService.getCreditMovies(this.personId).subscribe(movies => {
        this.movies = movies;
        // console.log("movies", this.movies)
      })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }
}
