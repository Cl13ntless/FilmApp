import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { MatButton } from "@angular/material/button";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  constructor(private authService: AuthService, private jwtHelper: JwtHelperService, private router: Router) {}

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

  logout(): void{
    this.authService.logout();
    this.router.navigate(['']);
  }
}
