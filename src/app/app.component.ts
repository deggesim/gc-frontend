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

  public async login(utente: Utente) {
    try {
      this.mostraPopupLogin = false;
      await this.authService.login(utente).toPromise();
      const title = 'Login';
      const message = 'Login effettuato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
    } catch (error) {
      console.error(error);
    }
  }

  public async logout() {
    try {
      await this.authService.logout();
      const title = 'Logout';
      const message = 'Logout effettuato correttamente';
      this.sharedService.notifica(globals.toastType.warning, title, message);
      this.router.navigate(['home']);
    } catch (error) {
      console.error(error);
    }
  }

  public annulla() {
    this.mostraPopupLogin = false;
    this.mostraPopupUserProfile = false;
  }

  public async salva(utente: Utente) {
    try {
      this.mostraPopupUserProfile = false;
      await this.authService.salva(utente).toPromise();
      const title = 'Modifica utente';
      const message = 'Utente modificato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
    } catch (error) {
      console.error(error);
    }
  }
}
