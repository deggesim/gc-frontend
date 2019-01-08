import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Andamento } from '../model/andamento';
import { environment } from './../../environments/environment';

@Injectable()
export class AndamentoService {

  private endpoint = environment.endpoint;

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<Andamento[]> {
    return this.http.get<Andamento[]>(`${this.endpoint}/andamento`);
  }

  get(id: number): Observable<Andamento> {
    return this.http.get<Andamento>(`${this.endpoint}/andamento/${id}`);
  }

  inserisci(item: Andamento): Observable<Andamento> {
    return this.http.post<Andamento>(`${this.endpoint}/andamento`, item);
  }

  modifica(item: Andamento): Observable<Andamento> {
    return this.http.put<Andamento>(`${this.endpoint}/andamento/${item.id}`, item);
  }

  elimina(id: number): Observable<string> {
    return this.http.delete(`${this.endpoint}/andamento/${id}`, { responseType: 'text' });
  }

}
