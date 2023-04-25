import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MovieService} from "../movie.service";
import {Movie} from "../movie";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class SearchbarComponent implements OnInit {
  movies: Movie[] = [];
  @Input() search: any ="";
  filteredMovies: Movie[] = [];

  @Output() onSelectedOption = new EventEmitter();

  @Output() onSubmitSearch = new EventEmitter();

  constructor(
    public movieService: MovieService
  ) {
    this.onSelectedOption.emit(this.movieService.searchOption)
  }

  ngOnInit() {
}

  searchForMovies(search: string){
    this.movieService.searchMovieContains(search).subscribe(value =>{
      this.filteredMovies = value;
      console.log("response for searched movie:",value);
      this.onSubmitSearch.emit(true);
    });
  }

}
