import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  spesa(frequenza: string): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/spesa/${frequenza}`);
  }

  carburante(frequenza: string): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/carburante/${frequenza}`);
  }

  bolletta(frequenza: string): Observable<Statistica[]> {
    return this.http.get<Statistica[]>(`${this.endpoint}/statistiche/bolletta/${frequenza}`);
  }

}
