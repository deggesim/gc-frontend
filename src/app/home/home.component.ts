import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Andamento } from '../model/andamento';
import { AndamentoService } from '../services/andamento.service';
import { AuthService } from '../services/auth.service';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  andamento: Andamento | undefined;
  mostraPopup: boolean = false;
  titoloModale: string = '';

  constructor(
    private route: Router,
    private sharedService: SharedService,
    private andamentoService: AndamentoService,
    private authService: AuthService
  ) {}

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  spesa() {
    this.andamento = {
      giorno: new Date(),
      descrizione: 'Spesa Conad',
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
      giorno: new Date(),
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
      giorno: new Date(),
      descrizione: 'Mariangela pulizie',
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
      giorno: new Date(),
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
