import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Movie} from "../movie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormControl} from "@angular/forms";
import {MovieService} from "../movie.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
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
        )
      ]
    )
  ]
})
export class MoviesComponent implements OnInit, OnDestroy {

  showDropDown: boolean = false;
  showMovieDesc: boolean = false;
  movie: { description: string; title: string } = {
    title: '',
    description: ''
  };
  movies: Movie[] = [];

  selectedMovieID: any;

  constructor(
              private router: Router,
              private movieService: MovieService,
  ) {}

  ngOnInit() {}
  addMovie() {
    this.movieService.addMovie(this.movie).subscribe(() =>
      this.router.navigate(['/movies'])
        .then(() => {
          this.movie.description = "";
          this.movie.title = "";
        })
    );
  }


  showMovieDetail(movieID: any){
    this.router.navigate([`/movie/${movieID}`]);
  }

  onSelectedIdChange(id: any){
    this.selectedMovieID = id;
    setTimeout( ()=> {
    this.showMovieDesc= true;
    }, 1);
  }

  showMovieAdd(){

  }
  ngOnDestroy(){}
}


