import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppUpdateService {
  private updateAvailable: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  updateAvaliable$: Observable<boolean> = this.updateAvailable.asObservable();

  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates.subscribe((event) => {
      switch (event.type) {
        case 'VERSION_READY':
          this.updates.activateUpdate().then(() => {
            this.updateAvailable.next(true);
          });
          break;
      }
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
