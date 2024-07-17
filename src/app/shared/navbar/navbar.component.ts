import { Component, effect, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserSubject } from 'src/app/services/user.subject';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  linkitems_clicked: boolean = false;
  isAuthenticated: boolean = false;
  formModel: any = {
    search_in: "movie"
  }

  constructor(
    private usersubject: UserSubject,
    private authService: AuthService,
    private router: Router
  ) { 
    effect(() => {
      this.isAuthenticated = !!this.usersubject.user();
    }) 
   }

  ngOnInit(): void {

  }

  Search(form: NgForm) {
    const search_key: string = form.value.search_key;
    const search_in: string = form.value.search_in;
    if (search_key != undefined && search_key != "") {
      this.router.navigate([`/search/${search_in}/${search_key}`]);
    } 
  }

  Logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.linkitems_clicked = !this.linkitems_clicked;
  }

}
