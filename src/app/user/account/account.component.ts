import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/models/movie-details.response.model';
import { CreditResponse } from 'src/app/models/person.response.model';
import { TvShowDetailsResponse } from 'src/app/models/tv-show-details.response.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { CreditService } from 'src/app/services/person-details.service';
import { TvShowDetailsService } from 'src/app/services/tv-show-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  image_url: string = environment.image_url;
  isLoading: boolean = true;
  current_title: string;
  current_page: number;
  total_pages: number;

  movieDetails: MovieDetailsResponse[] | null = null;
  tvshowDetails: TvShowDetailsResponse[] | null = null;
  CelebrityDetails: CreditResponse[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseSerive: FirebaseService,
    private movieDetailsService: MovieDetailsService,
    private tvshowDetailsService: TvShowDetailsService,
    private personDetailsService: CreditService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.current_title = params["kind"];
      this.current_page = Number(params["page"]);
      if (this.current_title == "favoritemovies") {
        this.SetMovies();
      } else if (this.current_title == "favoritetvshows") {
        this.SetTvShows();
      } else if (this.current_title == "favoritepeople") {
        this.SetCelebrities();
      } else {
        this.router.navigate(["/not-found"])
      }
    })
  }

  RemoveFromFavoriteList(id: number) {
    if (this.current_title == "favoritemovies") {
      this.firebaseSerive.AddorRemoveMovieFavorite("Remove", id).subscribe(data => {
        this.SetMovies();
      })
    } else if (this.current_title == "favoritetvshows") {
      this.firebaseSerive.AddorRemoveTvShowFavorite("Remove", id).subscribe(data => {
        this.SetTvShows();
      })
    } else if (this.current_title == "favoritepeople") {
      this.firebaseSerive.AddorRemovePersonFavorite("Remove", id).subscribe(data => {
        this.SetCelebrities();
      })
    }
  }

  SetMovies() {
    this.firebaseSerive.GetUserFavoriteList("movies").subscribe(movieIds => {
      movieIds.splice(0, 1);
      this.total_pages = Math.ceil(movieIds.length / 10);
      let movieIds_part = movieIds.slice(this.current_page * 10 - 10, this.current_page * 10);
      if (movieIds_part.length == 0 && this.current_page > 1) {
        this.current_page--;
        movieIds_part = movieIds.slice(this.current_page * 10 - 10, this.current_page * 10); 
      }
      this.movieDetails = [];

      for (let movieId of movieIds_part) {
        this.movieDetailsService.getMovieDetails(movieId).subscribe(data => {
          this.movieDetails.push(data);
          // console.log(this.movieDetails)
        })
      }
      this.isLoading = false;
    });
  }

  SetTvShows() {
    this.firebaseSerive.GetUserFavoriteList("tvshows").subscribe(tvshowIds => {
      tvshowIds.splice(0, 1);
      this.total_pages = Math.ceil(tvshowIds.length / 10);
      let tvshowIds_part = tvshowIds.slice(this.current_page * 10 - 10, this.current_page * 10);
      if (tvshowIds_part.length == 0 && this.current_page > 1) {
        this.current_page--;
        tvshowIds_part = tvshowIds.slice(this.current_page * 10 - 10, this.current_page * 10); 
      }
      this.tvshowDetails = [];

      for (let tvshowId of tvshowIds_part) {
        this.tvshowDetailsService.getTvShowDetails(tvshowId).subscribe(data => {
          this.tvshowDetails.push(data);
          // console.log(this.tvshowDetails)
        })
      } 
      this.isLoading = false;
    });
  }

  SetCelebrities() {
    this.firebaseSerive.GetUserFavoriteList("celebrities").subscribe(personIds => {
      personIds.splice(0, 1);
      this.total_pages = Math.ceil(personIds.length / 10);
      let personIds_part = personIds.slice(this.current_page * 10 - 10, this.current_page * 10);
      if (personIds_part.length == 0 && this.current_page > 1) {
        this.current_page--;
        personIds_part = personIds.slice(this.current_page * 10 - 10, this.current_page * 10); 
      }
      this.CelebrityDetails = [];

      for (let personId of personIds_part) {
        this.personDetailsService.getCreditDetails(personId).subscribe(data => {
          this.CelebrityDetails.push(data);
          // console.log(this.CelebrityDetails)
        })
      } 
      this.isLoading = false;
    });
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.current_page - 1, this.current_page, this.current_page + 1, this.current_page + 2, total - 2, total - 1, total]

    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i <= total && i > 0) {
        result.push(i);
      }
    }
    return result;
  }

}
