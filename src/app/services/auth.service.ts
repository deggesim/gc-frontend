import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';
import { Utente } from '../model/utente';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  private endpoint = environment.endpoint;

  constructor(
    private http: HttpClient
  ) { }

  public login(utente: Utente) {
    return this.http.post<{ utente: Utente, token: string }>(`${this.endpoint}/utente/login`, utente)
      .pipe(
        tap((res: { utente: Utente, token: string }) => this.setSession(res)), shareReplay());
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    return this.http.post<Utente>(`${this.endpoint}/utente/logout`, {});
  }

  public salva(utente: Utente) {
    return this.http.patch<{ utente: Utente, token: string }>(`${this.endpoint}/utente/me`, utente)
      .pipe(
        tap((res: { utente: Utente, token: string }) => localStorage.setItem('utente', JSON.stringify(utente))), shareReplay());
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult: { utente: Utente, token: string }) {
    const utente = authResult.utente;
    const token = authResult.token;
    const exp = jwt_decode(token)['exp'];
    const expiresAt = moment().add(exp);

    localStorage.setItem('token', token);
    localStorage.setItem('utente', JSON.stringify(utente));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

}

