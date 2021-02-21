import { Injectable } from '@angular/core';
import {TokenDto} from './token.dto';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {RedirectDto} from './redirect.dto';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  public logout(): void {
    this.clearTokens();
    this.redirectToLogin();
  }

  public refreshTokens(): Observable<TokenDto> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post<TokenDto>(environment.apiUrl + '/api/v1/auth/refresh', {refreshToken})
        .pipe(
          tap(
            tokens => this.updateTokens(tokens)
          ),
          // @ts-ignore
          catchError(err => this.redirectToLogin())
        );
    } else {
      this.redirectToLogin();
    }
  }

  public exchangeCodeForAuthAndRedirect(code: string): void {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('code', code);
    httpParams = httpParams.append('redirectUrl', environment.baseUrl + '/oauth');
    this.http.get<TokenDto>(environment.apiUrl + '/api/v1/auth/code', {params: httpParams})
      .subscribe(
        tokens => {
                          this.updateTokens(tokens);
                          this.router.navigateByUrl('/home');
                        },
      error => this.redirectToLogin());
  }

  private redirectToLogin(): void {
    this.clearTokens();
    let httpParams = new HttpParams();
    httpParams = httpParams.append('redirectUrl', environment.baseUrl + '/oauth');
    this.http.get<RedirectDto>(environment.apiUrl + '/api/v1/auth/redirectUrl', {params: httpParams})
      .subscribe(
        get => location.href = get.redirectUrl,
        error => console.error('implement error for login redirect') // todo: implement fail login
      );
  }

  private updateTokens(tokens: TokenDto): void {
    if (tokens !== null && tokens.accessToken !== null && tokens.refreshToken !== null) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
