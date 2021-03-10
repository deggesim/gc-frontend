import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoSpesa } from '../model/tipo-spesa';
import { environment } from './../../environments/environment';

@Injectable()
export class TipoSpesaService {
  private endpoint = environment.endpoint;

  constructor(private http: HttpClient) {}

  lista(): Observable<TipoSpesa[]> {
    return this.http.get<TipoSpesa[]>(`${this.endpoint}/tipo-spesa`);
  }
}
