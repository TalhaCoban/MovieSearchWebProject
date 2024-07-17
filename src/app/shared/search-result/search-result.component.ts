import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesResponse } from 'src/app/models/movies.response.model';
import { PeopleResponse } from 'src/app/models/people.response.model';
import { TvShowsResponse } from 'src/app/models/tv-shows.response.model';
import { SearchService } from 'src/app/services/searchService';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  movies: MoviesResponse | null = null;
  tvshows: TvShowsResponse | null = null;
  people: PeopleResponse | null = null;
  current_title: string;
  image_url: string = environment.image_url;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const search_in: string = params["search_in"];
      const search_key: string = params["search_key"];

      this.current_title = search_in;

      if (search_in == "movie") {
        this.searchService.SearchMovies(search_in, search_key).subscribe(data => {
          this.movies = data;
          // console.log("movies", this.movies)
        })
      } else if (search_in == "tv") {
        this.searchService.SearchTvShows(search_in, search_key).subscribe(data => {
          this.tvshows = data;
          console.log("tvshows", this.tvshows)
        })
      } else if (search_in == "person") {
        this.searchService.SearchPeople(search_in, search_key).subscribe(data => {
          this.people = data;
          // console.log("people", this.people)
        })
      }
    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

}
