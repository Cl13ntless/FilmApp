import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}
  // @ts-ignore
  username: string;
  // @ts-ignore
  password: string;
  errorMessage: string= "";

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
        next: response => {
          if (this.authService.isLoggedIn$) {
            console.log("Logged In!")
            console.log(this.authService.getToken());
            this.router.navigate(['/movies']);
          }
        },
        error: err => {
          this.errorMessage = "Login war nicht erfolgreich";
        }
      }
    )
  }
}
