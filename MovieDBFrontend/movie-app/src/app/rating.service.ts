import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private static RATING_URL = 'http://localhost:8080/api/v1/ratings'
  constructor(private http: HttpClient) { }

  public getRatingsForSpecificMovie(movieID: string){
    return this.http.post<any[]>('http://localhost:8080/api/v1/ratings/movies', {id: movieID});
  }

  public submitRating(rating:any){
    return  this.http.post('http://localhost:8080/api/v1/ratings', rating, {observe: "response"});
  }
}
