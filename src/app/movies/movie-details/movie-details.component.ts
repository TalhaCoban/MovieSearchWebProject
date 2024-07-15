import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetailsResponse } from 'src/app/models/movie-details.response.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { UserSubject } from 'src/app/services/user.subject';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  image_url = environment.image_url;
  movieDetails: MovieDetailsResponse | null = null;
  current_tab: string = "overview";
  isLoading: boolean = true;
  isAuthenticated: boolean;
  isInUserFavorite: boolean = false;

  private routeSub: Subscription;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private firebaseService: FirebaseService,
    private userSubject: UserSubject,
    private router: Router
  ) {
    effect(() => {
      this.isAuthenticated = !!this.userSubject.user()
    })
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.movieDetailsService.getMovieDetails(params['movieId']).subscribe(data => {
        this.movieDetails = data;
        // console.log("movie_details", data)
        this.isLoading = false;
        this.ControlFavorite();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  ControlFavorite() {
    if (this.isAuthenticated) {
      this.userSub = this.firebaseService.GetUserFavoriteList("movies").subscribe(data => {
        if (data.includes(this.movieDetails.id)) {
          this.isInUserFavorite = true;
        } else {
          this.isInUserFavorite = false;
        }
      });
    } else {
      this.isInUserFavorite = false;
    }
  }

  addFavorite(movieId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemoveMovieFavorite("Add", movieId).subscribe(data => {
        this.ControlFavorite();
      })
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  RemoveFavorite(movieId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemoveMovieFavorite("Remove", movieId).subscribe(data => {
        this.ControlFavorite();
      })
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  ChangeTab(tab: string) {
    this.current_tab = tab;
  }

}
