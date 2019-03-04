import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Andamento } from '../model/andamento';
import { AndamentoService } from '../services/andamento.service';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  andamento: Andamento;
  mostraPopup: boolean;
  titoloModale: string;

  constructor(
    private route: Router,
    private sharedService: SharedService,
    private andamentoService: AndamentoService
  ) { }

  ngOnInit() {
    console.log('init HomeComponent');
  }

  spesa() {
    this.andamento = {
      giorno: new Date(),
      descrizione: 'Spesa Conad',
      tipoSpesa: {
        id: 1,
        descrizione: 'Spesa'
      }
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
        descrizione: 'Carburante'
      }
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
        descrizione: 'Casa'
      }
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
        descrizione: 'Bollette'
      }
    };
    this.mostraPopup = true;
    this.titoloModale = 'Bolletta';
  }

  nuova() {
    this.andamento = {
      giorno: new Date(),
      descrizione: undefined,
      tipoSpesa: undefined
    };
    this.mostraPopup = true;
    this.titoloModale = 'Nuova voce di spesa';
  }

  async salva(andamento: Andamento) {
    console.log(andamento);
    await this.andamentoService.inserisci(andamento).toPromise();
    this.mostraPopup = false;
    const title = 'Nuova voce di spesa';
    const message = 'Nuova voce di spesa inserita correttamente';
    this.sharedService.notifica(globals.toastType.success, title, message);
    this.andamento = undefined;
    this.route.navigate(['/lista']);
  }

  annulla(): void {
    this.mostraPopup = false;
  }

}
