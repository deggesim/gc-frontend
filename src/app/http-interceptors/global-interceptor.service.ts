import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SharedService } from './../shared/shared.service';
import { SpinnerService } from './../shared/spinner.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.start();
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const error = this.sharedService.notifyError(err);
        if (401 === err.status || 403 === err.status) {
          localStorage.removeItem('token');
          localStorage.removeItem('expires_at');
          localStorage.removeItem('utente');
          this.authService.getLoginSubject().next(false);
          this.router.navigate(['login']);
        }
        return throwError(() => new Error(error));
      }),
      finalize(() => this.spinnerService.end()),
    );
  }
}
