import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Utente } from './model/utente';
import { AuthService } from './services/auth.service';
import * as globals from './shared/globals';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  // Sets initial value to true to show loading spinner on first load
  loading = true;

  mostraPopupLogin: boolean;
  mostraPopupUserProfile: boolean;

  constructor(
    private cdRef: ChangeDetectorRef,
    public spinnerService: SpinnerService,
    private sharedService: SharedService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('ngOnInit AppComponent');
  }

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
    await this.authService.login(utente).toPromise();
    this.mostraPopupLogin = false;
    const title = 'Login';
    const message = 'Login effettuato correttamente';
    this.sharedService.notifica(globals.toastType.success, title, message);
  }

  public async logout() {
    await this.authService.logout();
    const title = 'Logout';
    const message = 'Logout effettuato correttamente';
    this.sharedService.notifica(globals.toastType.warning, title, message);
  }

  public annulla() {
    this.mostraPopupLogin = false;
    this.mostraPopupUserProfile = false;
  }

  public async salva(utente: Utente) {
    await this.authService.salva(utente).toPromise();
    this.mostraPopupLogin = false;
    const title = 'Login';
    const message = 'Login effettuato correttamente';
    this.sharedService.notifica(globals.toastType.success, title, message);
  }

}
