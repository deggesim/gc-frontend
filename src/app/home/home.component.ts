import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Andamento } from '../model/andamento';
import { Utente } from '../model/utente';
import { AndamentoService } from '../services/andamento.service';
import { AuthService } from '../services/auth.service';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'gc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  andamento: Andamento | undefined;
  mostraPopup: boolean = false;
  titoloModale: string = '';

  isLoggedIn$ = this.authService.isLoggedIn();

  constructor(
    private route: Router,
    private sharedService: SharedService,
    private andamentoService: AndamentoService,
    private authService: AuthService
  ) {}

  public login(utente: Utente) {
    this.authService.login(utente).subscribe(() => {
      const title = 'Login';
      const message = 'Login effettuato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
    });
  }

  spesa() {
    this.andamento = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Spesa',
      tipoSpesa: {
        id: 1,
        descrizione: 'Spesa',
      },
    };
    this.mostraPopup = true;
    this.titoloModale = 'Spesa';
  }

  carburante() {
    this.andamento = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Gasolio Fiesta',
      tipoSpesa: {
        id: 2,
        descrizione: 'Carburante',
      },
    };
    this.mostraPopup = true;
    this.titoloModale = 'Carburante';
  }

  pulizie() {
    this.andamento = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Michela pulizie',
      tipoSpesa: {
        id: 7,
        descrizione: 'Casa',
      },
    };
    this.mostraPopup = true;
    this.titoloModale = 'Pulizie casa';
  }

  bolletta() {
    this.andamento = {
      giorno: DateTime.now().toISO(),
      descrizione: '',
      tipoSpesa: {
        id: 3,
        descrizione: 'Bollette',
      },
    };
    this.mostraPopup = true;
    this.titoloModale = 'Bolletta';
  }

  nuova() {
    this.andamento = undefined;
    this.mostraPopup = true;
    this.titoloModale = 'Nuova voce di spesa';
  }

  async salva(andamento: Andamento) {
    this.andamentoService.inserisci(andamento).subscribe(() => {
      this.mostraPopup = false;
      const title = 'Nuova voce di spesa';
      const message = 'Nuova voce di spesa inserita correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
      this.andamento = undefined;
      this.route.navigate(['/lista']);
    });
  }

  annulla(): void {
    this.mostraPopup = false;
  }
}
