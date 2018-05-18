import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SharedService } from './../shared/shared.service';
import { SpinnerService } from './../shared/spinner.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(
    private sharedService: SharedService,
    private spinnerService: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.start();
    return next.handle(req)
      .catch((err: HttpErrorResponse) => {
        this.spinnerService.end();
        this.sharedService.notifyError(err);
        return Observable.empty<HttpEvent<any>>();
      })
      .finally(() => this.spinnerService.end());
  }

}
