import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie} from "../movie";
import {JwtHelperService } from "@auth0/angular-jwt";
import {MoviesComponent} from "../movies/movies.component";
import {filter, tap} from "rxjs";
import {AuthService} from "../auth.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../rating.service";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0}),
            animate('2.5s ease-out',
              style({ opacity: 1}))
          ]
        ),
        // transition(
        //   ':leave',
        //   [
        //     style({ opacity: 1 }),
        //     animate('0.5s ease-in',
        //       style({ opacity: 0 }))
        //   ]
        // )
      ]
    )
  ]
})
export class RatingsComponent implements OnInit {
  errorMessage: any;
  expand: boolean = false;
  showRatings: boolean = false;
  ratingsForSelectedMovie: any[] = []
  movies: Movie[] = [];
  // @ts-ignore
  selectedMovieId: number;
  selectedMovieTitle: any ="";
  stars: number = 0;
  comment: string | null | undefined;
  ratings: any[] = [];
  username: string = "";

  constructor(private ratingService: RatingService,
              private movieService: MovieService,
              private http: HttpClient,
              private jwt: JwtHelperService,
              private authService: AuthService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      if (paramMap.get('id')){
        this.movieService.getMovieByID(Number(paramMap.get('id')))
          .subscribe(movie => {
            this.selectedMovieId = movie.id;
            this.selectedMovieTitle = movie.title;
            this.displayImportantRatings(this.selectedMovieId);
          });
      }
    })
  }

  submitRating() {
    // Erstelle Bewertung
    let decodedToken = this.jwt.decodeToken(this.authService.getToken());
    const rating = {
      stars: this.stars,
      comment: this.comment,
      movie: { id: this.selectedMovieId },
      account: { username: decodedToken.sub}
    };
    console.log("sending this object to backend",rating)
    // Füge Bewertung zur Datenbank hinzu
    this.ratingService.submitRating(rating).subscribe(
      () => {
        // Aktualisiere Bewertungsliste
        this.displayImportantRatings(this.selectedMovieId);
        // Setze Formular zurück

        // @ts-ignore
        this.selectedMovie = null;
        this.stars = 0;
        this.comment = null;
        this.errorMessage = null;
      },
      error => {
        if(error.status == 409) {
          this.errorMessage = "Sie haben schon eine Bewertung für diesen Film abgegeben!";
        } else {
          this.errorMessage = "Error beim einfügen der Bewertung!";
        }
      }
    );
  }

  displayImportantRatings(movieID: any){
    this.selectedMovieId = movieID;
    this.ratingService.getRatingsForSpecificMovie(movieID).subscribe(data => {
        console.log(data);
        this.expand = true;
        this.showRatings = true;
        this.ratingsForSelectedMovie = data;
        this.errorMessage = null;
      })
  }
}
