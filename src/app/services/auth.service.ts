import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { isEmpty } from 'lodash-es';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Utente } from '../model/utente';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  private endpoint = environment.endpoint;

  isLoginSubject = new BehaviorSubject<boolean>(this.tokenValid());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public login(utente: Utente) {
    return this.http.post<{ utente: Utente; token: string }>(`${this.endpoint}/utente/login`, utente).pipe(
      tap((res: { utente: Utente; token: string }) => this.setSession(res)),
      shareReplay(),
    );
  }

  public logout(): Observable<Utente> {
    return this.http.post<Utente>(`${this.endpoint}/utente/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('utente');
        this.isLoginSubject.next(false);
        this.router.navigate(['home']);
      }),
    );
  }

  public salva(utente: Utente): Observable<{ utente: Utente; token: string }> {
    return this.http.patch<{ utente: Utente; token: string }>(`${this.endpoint}/utente/me`, utente).pipe(
      tap((res: { utente: Utente; token: string }) => localStorage.setItem('utente', JSON.stringify(utente))),
      shareReplay(),
    );
  }

  public getLoginSubject() {
    return this.isLoginSubject;
  }

  public isLoggedIn() {
    return this.isLoginSubject.asObservable();
  }

  private tokenValid() {
    return !isEmpty(localStorage.getItem('token')) && DateTime.now() < this.getExpiration();
  }

  private getExpiration(): DateTime {
    const expiration = localStorage.getItem('expires_at') as string;
    return DateTime.fromMillis(+expiration);
  }

  private setSession(authResult: { utente: Utente; token: string }) {
    const utente = authResult.utente;
    const token = authResult.token;
    const exp = jwtDecode<JwtPayload>(token)['exp'];
    const expiresAt = DateTime.now().plus({ milliseconds: exp });

    localStorage.setItem('token', token);
    localStorage.setItem('utente', JSON.stringify(utente));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.isLoginSubject.next(true);
  }
}
