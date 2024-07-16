import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.css']
})
export class PwResetComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  passwordReset(form: NgForm) {
    const email: string = form.value.email;
    if (email) {
      this.authService.sendPasswordResetEmail(email).subscribe(data => {
        alert("Şifre yenileme linki Email adresinize gönderildi");
        this.router.navigate(["/auth/login"]);
      })
    }
  }
}
