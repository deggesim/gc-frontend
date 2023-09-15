import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isEmpty, isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { switchMap, tap } from 'rxjs';
import { Utente } from 'src/app/model/utente';
import { AuthService } from 'src/app/services/auth.service';
import { Andamento } from '../../model/andamento';
import { AndamentoService } from '../../services/andamento.service';
import * as globals from '../../shared/globals';
import { PopupConfermaComponent } from '../../shared/popup-conferma/popup-conferma.component';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'gc-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  lista: Andamento[] = [];
  listaPaginata: Andamento[] = [];
  listaFiltrata: Andamento[] = [];

  andamentoSelected: Andamento | undefined;
  mostraPopupModifica: boolean = false;
  titoloModale: string = '';
  filter: string = '';

  @ViewChild('popupConfermaElimina', { static: true })
  public popupConfermaElimina!: PopupConfermaComponent;

  // paginazione
  size!: number;
  page = 1;
  pageSize = 10;
  maxSize = 5;
  boundaryLinks = true;
  searchExecute = false;

  // ordinamento colonne
  sortedByGiornoAsc = false;
  sortedByGiornoDesc = false;
  sortedByDescrizioneAsc = false;
  sortedByDescrizioneDesc = false;
  sortedByCostoAsc = false;
  sortedByCostoDesc = false;

  isLoggedIn$ = this.authService.isLoggedIn();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sharedService: SharedService,
    private andamentoService: AndamentoService
  ) {}

  ngOnInit() {
    this.isLoggedIn$.subscribe((loggeIn: boolean) => {
      if (!loggeIn) {
        this.router.navigate(['/login']);
      }
    });

    this.route.data.subscribe((data: Data) => {
      this.lista = data['lista'];
      this.size = this.lista.length;
      this.listaPaginata = this.buildPage();
    });
  }

  applicaFiltro(filtro: string | undefined) {
    if (filtro != null && filtro.length > 2) {
      this.listaFiltrata = this.lista.filter((andamento: Andamento) => {
        const descrizioneFound = andamento.descrizione.toLowerCase().indexOf(filtro.toLowerCase()) >= 0;
        const tipoSpesaFound = andamento.tipoSpesa.descrizione.toLowerCase().indexOf(filtro.toLowerCase()) >= 0;
        return descrizioneFound || tipoSpesaFound;
      });
    } else {
      this.listaFiltrata = this.lista;
    }
    this.size = this.listaFiltrata.length;
    this.listaPaginata = this.buildPage();
  }

  pulisciFiltro(): void {
    this.filter = '';
    this.size = this.lista.length;
    this.listaPaginata = this.buildPage();
  }

  nuova() {
    this.andamentoSelected = undefined;
    this.mostraPopupModifica = true;
    this.titoloModale = 'Nuova voce di spesa';
  }

  spesa() {
    this.andamentoSelected = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Spesa',
      tipoSpesa: {
        id: 1,
        descrizione: 'Spesa',
      },
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Spesa';
  }

  carburante() {
    this.andamentoSelected = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Gasolio Fiesta',
      tipoSpesa: {
        id: 2,
        descrizione: 'Carburante',
      },
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Carburante';
  }

  pulizie() {
    this.andamentoSelected = {
      giorno: DateTime.now().toISO(),
      descrizione: 'Michela pulizie',
      tipoSpesa: {
        id: 7,
        descrizione: 'Casa',
      },
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Pulizie casa';
  }

  //   bolletta() {
  //     this.andamentoSelected = {
  //       giorno: DateTime.now().toISO(),
  //       descrizione: '',
  //       tipoSpesa: {
  //         id: 3,
  //         descrizione: 'Bollette',
  //       },
  //     };
  //     this.mostraPopupModifica = true;
  //     this.titoloModale = 'Bolletta';
  //   }

  modifica(item: Andamento): void {
    this.andamentoSelected = {
      id: item.id,
      giorno: item.giorno,
      descrizione: item.descrizione,
      costo: item.costo,
      tipoSpesa: {
        id: item.tipoSpesa.id,
        descrizione: item.tipoSpesa.descrizione,
      },
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Modifica voce di spesa';
  }

  clona(item: Andamento): void {
    this.andamentoSelected = {
      giorno: DateTime.now().toISO(),
      descrizione: item.descrizione,
      costo: item.costo,
      tipoSpesa: {
        id: item.tipoSpesa.id,
        descrizione: item.tipoSpesa.descrizione,
      },
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Clona voce di spesa';
  }

  salva(andamento: Andamento) {
    const obs$ = isNil(andamento.id) ? this.andamentoService.inserisci(andamento) : this.andamentoService.modifica(andamento);
    obs$
      .pipe(
        tap(() => {
          this.mostraPopupModifica = false;
          isNil(andamento.id)
            ? this.sharedService.notifica(globals.toastType.success, 'Nuova voce di spesa', 'Nuova voce di spesa inserita correttamente')
            : this.sharedService.notifica(globals.toastType.success, 'Modifica voce di spesa', 'Voce di spesa modificata correttamente');
        }),
        switchMap(() => this.andamentoService.lista())
      )
      .subscribe((lista: Andamento[]) => {
        this.andamentoSelected = undefined;
        this.lista = lista;
        this.applicaFiltro(this.filter);
      });
  }

  annulla(): void {
    this.mostraPopupModifica = false;
  }

  apriPopupElimina(andamento: Andamento) {
    this.andamentoSelected = andamento;
    this.popupConfermaElimina.apriModale();
  }

  confermaElimina() {
    if (this.andamentoSelected && this.andamentoSelected.id) {
      this.andamentoService
        .elimina(this.andamentoSelected.id)
        .pipe(
          tap(() => {
            this.sharedService.notifica(
              globals.toastType.warning,
              'Voce di spesa eliminata',
              'La voce di spesa è stata eliminata correttamente'
            );
          }),
          switchMap(() => this.andamentoService.lista())
        )
        .subscribe((lista: Andamento[]) => {
          this.popupConfermaElimina.chiudiModale();
          this.andamentoSelected = undefined;
          this.lista = lista;
          this.applicaFiltro(this.filter);
        });
    }
  }

  abilitaPaginazione() {
    return !isEmpty(this.lista) && this.lista.length > this.pageSize;
  }

  pageChange(event: { page: number; itemsPerPage: number }) {
    this.page = event.page;
    this.listaPaginata = this.buildPage();
  }

  buildPage() {
    let lista: Andamento[] = [];
    if (this.filter != null && this.filter.length > 2) {
      lista = this.listaFiltrata;
    } else {
      lista = this.lista;
    }
    const first = this.pageSize * (this.page - 1);
    const last = first + this.pageSize;
    return lista.slice(first, last);
  }

  sortByGiornoAsc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item1.giorno, item2.giorno);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByGiornoAsc = true;
  }

  sortByGiornoDesc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item2.giorno, item1.giorno);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByGiornoDesc = true;
  }

  sortByDescrizioneAsc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item1.descrizione, item2.descrizione);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByDescrizioneAsc = true;
  }

  sortByDescrizioneDesc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item2.descrizione, item1.descrizione);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByDescrizioneDesc = true;
  }

  sortByCostoAsc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(false, item1.costo, item2.costo);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByCostoAsc = true;
  }

  sortByCostoDesc() {
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(false, item2.costo, item1.costo);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByCostoDesc = true;
  }

  private clearAllSortIcons() {
    this.sortedByGiornoAsc = false;
    this.sortedByGiornoDesc = false;
    this.sortedByDescrizioneAsc = false;
    this.sortedByDescrizioneDesc = false;
    this.sortedByCostoAsc = false;
    this.sortedByCostoDesc = false;
  }

  private compare(lexicographic: boolean, arg1: any, arg2: any): number {
    if (lexicographic) {
      if (arg1 > arg2) {
        return 1;
      }
      if (arg1 < arg2) {
        return -1;
      }
      return 0;
    } else {
      return arg1 - arg2;
    }
  }
}
