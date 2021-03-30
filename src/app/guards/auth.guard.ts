import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('utente');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
