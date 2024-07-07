import { Component, OnInit } from '@angular/core';
import { Country, CountryRepository } from 'src/app/models/countries.repository';
import { Genre, MovieGenreRepository } from 'src/app/models/genres.repository';
import { MoviesResponse } from 'src/app/models/movies.response.model';
import { DiscoverMoviesService } from 'src/app/services/movie-discover.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.css']
})
export class DiscoverMoviesComponent implements OnInit {

  image_url: string = environment.image_url;
  isLoading: boolean = false
  current_movies: MoviesResponse | null = null;
  current_title = "discover";
  current_movies_page: number = 1;
  genres: Genre[] = [];
  countries: Country[] = [];

  constructor(
    private discoverMoviesService: DiscoverMoviesService,
    private genreRepository: MovieGenreRepository,
    private countryRepository: CountryRepository
  ) {}

  ngOnInit(): void {
      this.genres = this.genreRepository.getGenres();
      this.countries = this.countryRepository.getCountries();
      this.discoverMoviesService.getMovies().subscribe(data => {
        this.current_movies = data;
      });
  }

  getYears(count?: number): number[] {
    let currentDate = new Date();
    let currentYear: number = currentDate.getFullYear();
    let Years: number[] = [];
    let minYear: number = 1910;
    if (count) {
      minYear = currentYear - count;
    }
    for (let i = currentYear; minYear < i; i--) {
      Years.push(i)
    }
    return Years;
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.current_movies.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1,2,3,4, this.current_movies_page-1, this.current_movies_page, this.current_movies_page+1, this.current_movies_page+2, total-2, total-1, total]

    for (let i of array) {
      if ( !result.includes(i) && i != 0 && Math.max(...result) < i && i < total ) {
        result.push(i);
      }
    }
    return result;
  }
}
