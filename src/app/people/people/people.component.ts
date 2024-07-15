import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleResponse } from 'src/app/models/people.response.model';
import { PeopleService } from 'src/app/services/people.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  image_url: string = environment.image_url;
  isLoading: boolean = false;
  celebritiesList: PeopleResponse | null = null;
  current_page: number = 1;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      const page: number = params["page"];
      this.current_page = page;
      this.peopleService.getCelebritiesList(page).subscribe(data => {
        this.celebritiesList = data;
        // console.log(this.celebritiesList)
        this.isLoading = false;
      })
    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.celebritiesList.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.current_page - 1, this.current_page, this.current_page + 1, this.current_page + 2, total - 2, total - 1, total]

    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < total) {
        result.push(i);
      }
    }
    return result;
  }


}
