import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private jwtService: JwtHelperService) {
  }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this.authService.getToken();

    if (idToken && !this.jwtService.isTokenExpired(idToken)) {
      const cloned = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*',
            'Authorization': `Bearer ${idToken}`
          }
      });
      console.log(cloned);
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
