import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from './model/utente';
import { AuthService } from './services/auth.service';
import * as globals from './shared/globals';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  // Sets initial value to true to show loading spinner on first load
  loading = true;

  mostraPopupLogin: boolean = false;
  mostraPopupUserProfile: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    public spinnerService: SpinnerService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewChecked(): void {
    this.loading = this.spinnerService.isLoading();
    this.cdRef.detectChanges();
  }

  public openLogin() {
    this.mostraPopupLogin = true;
  }

  public profile() {
    this.mostraPopupUserProfile = true;
  }

  public login(utente: Utente) {
    this.mostraPopupLogin = false;
    this.authService.login(utente).subscribe(() => {
      const title = 'Login';
      const message = 'Login effettuato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
    });
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      const title = 'Logout';
      const message = 'Logout effettuato correttamente';
      this.sharedService.notifica(globals.toastType.warning, title, message);
      this.router.navigate(['home']);
    });
  }

  public annulla() {
    this.mostraPopupLogin = false;
    this.mostraPopupUserProfile = false;
  }

  public salva(utente: Utente) {
    this.mostraPopupUserProfile = false;
    this.authService.salva(utente).subscribe(() => {
      const title = 'Modifica utente';
      const message = 'Utente modificato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
    });
  }
}
