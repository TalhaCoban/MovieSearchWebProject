import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  linkitems_clicked: boolean = false;

  constructor() {  }

  ngOnInit(): void {
      
  }

  toggleMenu() {
    this.linkitems_clicked = !this.linkitems_clicked;
  }

}
