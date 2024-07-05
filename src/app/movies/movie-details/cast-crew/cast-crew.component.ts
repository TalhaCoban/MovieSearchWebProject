import { Component, Input, OnInit } from '@angular/core';
import { MovieCasts } from 'src/app/models/movie-casts.response';
import { MovieCastsService } from 'src/app/services/movie-casts.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'cast-crew',
  templateUrl: './cast-crew.component.html',
  styleUrls: ['./cast-crew.component.css']
})
export class CastCrewComponent implements OnInit {

  @Input() movieId: number;
  movieCastsCrews: MovieCasts | null = null;
  image_url = environment.image_url;

  constructor(
    private movieCastsService: MovieCastsService,
  ) { }

  ngOnInit(): void {
      this.movieCastsService.getMovieCasts(this.movieId).subscribe(casts => {
        this.movieCastsCrews = casts;
        // console.log("casts", this.movieCastsCrews);
      });
  }

}
