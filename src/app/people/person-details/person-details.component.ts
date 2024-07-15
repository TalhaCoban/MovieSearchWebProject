import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreditResponse } from 'src/app/models/person.response.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CreditService } from 'src/app/services/person-details.service';
import { UserSubject } from 'src/app/services/user.subject';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  image_url: string = environment.image_url;
  isLoading: boolean = true;
  credit_details: CreditResponse | null = null;
  current_tab: string = "overview";
  isAuthenticated: boolean;
  isInUserFavorite: boolean = false;

  private routeSub: Subscription;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private creditService: CreditService,
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
      const personId = params["personId"];
      if (personId) {
        this.creditService.getCreditDetails(personId).subscribe(person => {
          this.credit_details = person;
          // console.log(this.credit_details)
          this.isLoading = false
          this.ControlFavorite();
        })
      }
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
      this.userSub = this.firebaseService.GetUserFavoriteList("celebrities").subscribe(data => {
        if (data.includes(this.credit_details.id)) {
          this.isInUserFavorite = true;
        } else {
          this.isInUserFavorite = false;
        }
      });
    } else {
      this.isInUserFavorite = false;
    }
  }

  addFavorite(personId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemovePersonFavorite("Add", personId).subscribe(data => {
        this.ControlFavorite();
      })
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  RemoveFavorite(personId: number) {
    if (this.isAuthenticated) {
      this.firebaseService.AddorRemovePersonFavorite("Remove", personId).subscribe(data => {
        this.ControlFavorite();
      })
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  ChangeTab(tab: string) {
    this.current_tab = tab;
  }
}
