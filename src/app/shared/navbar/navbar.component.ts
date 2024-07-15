import { Component, effect, OnInit } from '@angular/core';
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

  constructor(
    private usersubject: UserSubject,
    private authService: AuthService
  ) { 
    effect(() => {
      this.isAuthenticated = !!this.usersubject.user();
    }) 
   }

  ngOnInit(): void {
  }

  Logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.linkitems_clicked = !this.linkitems_clicked;
  }

}
