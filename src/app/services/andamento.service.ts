import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  inserisci(item: Andamento): Observable<{} | Andamento> {
    return this.http.post(`${this.endpoint}/gestitem/inserisci`, item);
  }

  modifica(item: Andamento): Observable<{} | Andamento> {
    return this.http.post(`${this.endpoint}/gestitem/modifica`, item);
  }

  elimina(item: Andamento) {
    return this.http.post(`${this.endpoint}/gestitem/elimina`, item);
  }

}
