import { NgIf } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './layout/header/header.component';
import { Utente } from './model/utente';
import { AppUpdateService } from './services/app-update.service';
import { AuthService } from './services/auth.service';
import * as globals from './shared/globals';
import { PopupConfermaComponent } from './shared/popup-conferma/popup-conferma.component';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet,
    NgIf,
    FaIconComponent,
    ModalDirective,
    UserProfileComponent,
    PopupConfermaComponent,
    RouterOutlet,
  ],
})
export class AppComponent implements AfterViewChecked, OnInit {
  // Sets initial value to true to show loading spinner on first load
  loading = true;
  mostraPopupUserProfile: boolean = false;
  @ViewChild('popupAggiorna', { static: true })
  public popupAggiorna!: PopupConfermaComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public spinnerService: SpinnerService,
    private sharedService: SharedService,
    private authService: AuthService,
    private appUpdateService: AppUpdateService,
    private themeService: ThemeService,
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.appUpdateService.updateAvaliable$.subscribe(
      (updateAvailable: boolean) => {
        if (updateAvailable) {
          this.popupAggiorna.apriModale();
        }
      }
    );

    this.themeService.theme$.subscribe((theme) => {
      document.documentElement.setAttribute('data-bs-theme', theme);
    });
  }

  ngAfterViewChecked(): void {
    this.loading = this.spinnerService.isLoading();
    this.cdRef.detectChanges();
  }

  public profile() {
    this.mostraPopupUserProfile = true;
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      const title = 'Logout';
      const message = 'Logout effettuato correttamente';
      this.sharedService.notifica(globals.toastType.warning, title, message);
      this.router.navigate(['/login']);
    });
  }

  public annulla() {
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
