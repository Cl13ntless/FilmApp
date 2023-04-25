import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private isLoggedIn = new BehaviorSubject<Boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  private API_URL = 'http://localhost:8080/api/v1/auth/';
  private TOKEN_KEY = 'auth-token';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  checkForToken(){
    if(this.getToken() && !this.isTokenExpired(this.getToken())){
      this.isLoggedIn.next(true);
    } else{
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/authenticate',{username, password}).pipe(
      tap((response: any) => {
        console.log(response);
        this.setSession(response.token);
        this.isLoggedIn.next(true);
      })
    )
  }

  register(username: string, password: string): Observable<any>{
    return this.http.post("http://localhost:8080/api/v1/auth/register",{username, password}).pipe(
       tap(
         (response: any) => {
            console.log("token from registration:", response.token);
            this.setSession(response.token);
            this.isLoggedIn.next(true);
      }
      )
    )
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.next(false);
  }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // isLoggedIn(): boolean {
  //   const token = this.getToken();
  //   return token != null && !this.isTokenExpired(token);
  // }

  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private setSession(token: string) {
    localStorage.setItem(this.TOKEN_KEY,token);
  }
}
