import {Routes} from "@angular/router";
import {MovieDetailComponent} from "./movies/movie-detail/movie-detail.component";
import {MoviesComponent} from "./movies/movies.component";
import {RatingsComponent} from "./ratings/ratings.component";
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";
import {RegisterComponent} from "./register/register.component";

export const APP_ROUTES: Routes = [
  {
    path: 'movie/:id', component:MovieDetailComponent
  },
  {
    path: 'movies', component:MoviesComponent
  },
  {
    path: 'ratings', component:RatingsComponent
  },
  {
    path: 'ratings/:id', component:RatingsComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'users', component:UsersComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: '', component:LoginComponent
  },
];
