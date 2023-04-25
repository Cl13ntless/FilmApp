import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Movie} from "../../movie";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {observable, Subscription} from "rxjs";
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy, OnChanges {

  movie: Movie = {
    id: 1,
    title: '',
    description: ''
  };

  @Input() selectedMovieID: any;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getMovieByID(this.selectedMovieID).subscribe(
      movie => {
        this.movie = movie;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['selectedMovieID'];
    this.movieService.getMovieByID(change.currentValue).subscribe(
      movie => {
        this.movie = movie;
      }
    )
  }

  ngOnDestroy(){}
}
