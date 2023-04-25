import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login-pill',
  templateUrl: './login-pill.component.html',
  styleUrls: ['./login-pill.component.css']
})
export class LoginPillComponent implements OnInit {
  currentUser = "";

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {this.authService.isLoggedIn$.subscribe({
    next: event => {
      if(event){
        let decodedToken = this.jwtHelper.decodeToken(this.authService.getToken());
        this.currentUser = decodedToken.sub;
      } else {
        this.currentUser = "";
      }
    }
  })
    this.authService.checkForToken();
  }
}
