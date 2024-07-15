import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      
  }

  Login(form: NgForm) {

    if (!form.valid) {
      return
    } else {

      const email = form.value.email;
      const password = form.value.password;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }
}
