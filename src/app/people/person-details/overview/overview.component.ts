import { Component, Input, OnInit } from '@angular/core';
import { CreditResponse } from 'src/app/models/person.response.model';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() details: CreditResponse;
  
  constructor() {}

  ngOnInit(): void {
      
  }
}
