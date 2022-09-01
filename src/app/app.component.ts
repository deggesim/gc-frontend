import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Utente } from './model/utente';
import { AppUpdateService } from './services/app-update.service';
import { AuthService } from './services/auth.service';
import * as globals from './shared/globals';
import { PopupConfermaComponent } from './shared/popup-conferma/popup-conferma.component';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked, OnInit {
  // Sets initial value to true to show loading spinner on first load
  loading = true;

  mostraPopupLogin: boolean = false;
  mostraPopupUserProfile: boolean = false;

  @ViewChild('popupAggiorna', { static: true })
  public popupAggiorna!: PopupConfermaComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    public spinnerService: SpinnerService,
    private sharedService: SharedService,
    private authService: AuthService,
    private appUpdateService: AppUpdateService
  ) {}

  ngOnInit(): void {
    this.appUpdateService.updateAvaliable$.subscribe((updateAvailable: boolean) => {
      if (updateAvailable) {
        this.popupAggiorna.apriModale();
      }
    });
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

  public aggiornaApp() {
    this.popupAggiorna.chiudiModale();
    this.appUpdateService.doAppUpdate();
  }
}
