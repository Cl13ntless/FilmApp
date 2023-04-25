import {Injectable} from '@angular/core';
import {Movie} from "./movie";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: Movie[] = []
  searchOption: any = [];
  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>('http://localhost:8080/api/v1/movies');

  }

  getMovieByID(movieID: number): Observable<Movie>{
    return this.http.get<Movie>(`http://localhost:8080/api/v1/movies/${movieID}`);
  }

  addMovie(movie: { description: string; title: string }): Observable<any> {
    return this.http.post<Movie>('http://localhost:8080/api/v1/movies', movie);
  }

  searchMovieContains(contains: string): Observable<Movie[]>{
    return this.http.post<Movie[]>('http://localhost:8080/api/v1/movies/contains', contains);
  }
  filteredListOptions() {
    let movies = this.movies;
    let filteredPostsList = [];
    for (let movie of movies) {
      for (let options of this.searchOption) {
        if (options.title === movie.title) {
          filteredPostsList.push(movie);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
