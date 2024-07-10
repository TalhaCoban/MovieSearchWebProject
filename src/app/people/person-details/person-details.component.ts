import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditResponse } from 'src/app/models/person.response.model';
import { CreditService } from 'src/app/services/person-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  image_url: string = environment.image_url;
  isLoading: boolean = true;
  credit_detaiils: CreditResponse | null = null;
  current_tab: string = "overview";

  constructor(
    private route: ActivatedRoute,
    private creditService: CreditService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
      this.route.params.subscribe(params => {
        const personId = params["personId"];
        if (personId) {
          this.creditService.getCreditDetails(personId).subscribe(person => {
            this.credit_detaiils = person;
            // console.log(this.credit_detaiils)
            this.isLoading = false
          })
        }
      })
  }

  ChangeTab(tab: string) {
    this.current_tab = tab;
  }
}
