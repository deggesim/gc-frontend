import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Utente } from '../model/utente';
import { tap, shareReplay } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  private endpoint = environment.endpoint;

  constructor(
    private http: HttpClient
  ) { }

  login(utente: Utente) {
    return this.http.post<Utente>(`${this.endpoint}/utente/login`, utente)
      .pipe(
        tap((res) => this.setSession(res)), shareReplay());
  }

  private setSession(authResult) {
    const utente = authResult.utente;
    const token = authResult.token;
    const exp = jwt.decode(token)['exp'];
    const expiresAt = moment().add(exp);

    localStorage.setItem('token', token);
    localStorage.setItem('utente', utente);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    return this.http.post<Utente>(`${this.endpoint}/utente/logout`)
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

