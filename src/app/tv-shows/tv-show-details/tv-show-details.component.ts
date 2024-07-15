import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvShowDetailsResponse } from 'src/app/models/tv-show-details.response.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TvShowDetailsService } from 'src/app/services/tv-show-details.service';
import { UserSubject } from 'src/app/services/user.subject';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit, OnDestroy {

  image_url: string = environment.image_url;
  tvshowDetails: TvShowDetailsResponse | null = null;
  current_tab: string = "overview";
  isLoading: boolean = true;
  isAuthenticated: boolean;
  isInUserFavorite: boolean = false;

  private routeSub: Subscription;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tvshowDetailsService: TvShowDetailsService,
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
      const tvshowId = params["tvshowId"];
      this.tvshowDetailsService.getTvShowDetails(tvshowId).subscribe(details => {
        this.tvshowDetails = details;
        // console.log(this.tvshowDetails);
        this.isLoading = false;
        this.ControlFavorite();
      })
    })
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
      this.userSub = this.firebaseService.GetUserFavoriteList("tvshows").subscribe(data => {
        if (data.includes(this.tvshowDetails.id)) {
          this.isInUserFavorite = true;
        } else {
          this.isInUserFavorite = false;
        }
      });
    } else {
      this.isInUserFavorite = false;
    }
  }

  addFavorite(tvhsowId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemoveTvShowFavorite("Add", tvhsowId).subscribe(data => {
        this.ControlFavorite();
      })
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  RemoveFavorite(tvhsowId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemoveTvShowFavorite("Remove", tvhsowId).subscribe(data => {
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
