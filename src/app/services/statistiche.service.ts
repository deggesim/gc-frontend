import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Statistica } from '../model/statistica';
import { environment } from './../../environments/environment';

@Injectable()
export class StatisticheService {

  private endpoint = environment.endpoint;

  constructor(
    private http: HttpClient
  ) { }

  speseFrequenti(range: string): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/spese-frequenti/${range}`);
  }

  spesaMensile(): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/spesa-mensile`);
  }

  carburanteMensile(): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/carburante-mensile`);
  }

  bollettaMensile(): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/bolletta-mensile`);
  }

}
