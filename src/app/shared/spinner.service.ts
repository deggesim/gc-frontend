import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  // contatore di richieste in attesa di completamento
  private loading = 0;

  constructor() {}

  public start() {
    this.loading++;
  }

  public end() {
    this.loading > 0 ? this.loading-- : (this.loading = 0);
  }

  public isLoading() {
    return this.loading > 0;
  }
}
