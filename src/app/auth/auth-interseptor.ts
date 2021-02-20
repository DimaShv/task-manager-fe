import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthHeader(req);
    return next.handle(req)
      .pipe(
        // @ts-ignore
        catchError(err => {
          if (err.status === 401) {
            this.auth.refreshTokens()
              .pipe(
                tap(
                  request => next.handle(this.addAuthHeader(req)),
                  error => this.auth.logout()
                )
              );
          }
      })
    );
  }

  private addAuthHeader(request): HttpRequest<any> {
    const authToken = this.auth.getAccessToken();
    if (authToken) {
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
    }
    return request;
  }
}
