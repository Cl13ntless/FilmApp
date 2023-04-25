import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  ratings: any[] = [];
  orderedRatings: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/v1/accounts').subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
    this.http.get<any[]>('http://localhost:8080/api/v1/ratings').subscribe(
      data => {
        this.ratings = data
        this.orderedRatings = this.ratings.reduce((acc, curr) => {
          const key = curr.account.username;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(curr);
          return acc;
        }, {});
        this.orderedRatings = Object.keys(this.orderedRatings).map(key => this.orderedRatings[key]);
      }
    )
  }
}
