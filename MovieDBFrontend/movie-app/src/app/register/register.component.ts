import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void{
    this.authService.register(this.username,this.password).subscribe({
      next: response => {
        this.router.navigate(['/movies']);
      },
      error: err => {
        console.log(err.status == 409);
        if(err.status == 409){
          this.errorMessage ="Benutzername ist bereits vergeben!";
        } else {
          this.errorMessage = "Registrierung war nicht erfolgreich!";
        }
      }
    })
  }
}
