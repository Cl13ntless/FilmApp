import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { RouterModule } from "@angular/router";
import {APP_ROUTES} from "./app.routes";
import { SidebarComponent } from './sidebar/sidebar.component';
import { RatingsComponent } from './ratings/ratings.component';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./AuthInterceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import { LoginPillComponent } from './login-pill/login-pill.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatSelectSearchModule} from "mat-select-search";
import {MatCardModule} from "@angular/material/card";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { SearchbarComponent } from './searchbar/searchbar.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    SidebarComponent,
    RatingsComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent,
    LoginPillComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth_token');
        }
      }
    }),
    NgbRating,
    MatSelectSearchModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatLegacyChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
