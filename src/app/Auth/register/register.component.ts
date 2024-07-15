import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
      
  }

  Register(form: NgForm) {

    if (!form.valid) {
      return
    } else {

      if (form.value.password !== form.value.password_again) {
        alert("şifreler uyuşmuyor")
        return
      } else {
        const name = form.value.name;
        const surname = form.value.surname;
        const email = form.value.email;
        const password = form.value.password;

  
        this.authService.register(name, surname, email, password).subscribe({
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

}