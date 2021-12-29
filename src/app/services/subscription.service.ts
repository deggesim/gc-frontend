import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private endpoint = environment.endpoint;

  constructor(private http: HttpClient) {}

  subscribe(item: PushSubscription): Observable<PushSubscription> {
    return this.http.post<PushSubscription>(`${this.endpoint}/subscription`, item);
  }
}
