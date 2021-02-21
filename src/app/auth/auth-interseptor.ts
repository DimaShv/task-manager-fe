import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError, timer} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, mergeMap, retryWhen, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // @ts-ignore
    return next.handle(this.addAuthHeader(request)).pipe(catchError(error => {
        if (error.status === 401) {
          return this.auth.refreshTokens().pipe(
            switchMap(() => next.handle(this.addAuthHeader(request)))
          );
        }
        return throwError(error);
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
