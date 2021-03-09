import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNil } from 'lodash-es';
import { Andamento } from '../../model/andamento';
import { AndamentoService } from '../../services/andamento.service';
import * as globals from '../../shared/globals';
import { PopupConfermaComponent } from '../../shared/popup-conferma/popup-conferma.component';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  lista: Andamento[];
  listaPaginata: Andamento[];
  listaFiltrata: Andamento[];

  andamentoSelected: Andamento;
  mostraPopupModifica: boolean;
  titoloModale: string;
  filter: string;

  @ViewChild('popupConfermaElimina', { static: true }) public popupConfermaElimina: PopupConfermaComponent;

  // paginazione
  size: number;
  page = 1;
  pageSize = 20;
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

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private andamentoService: AndamentoService
  ) { }

  ngOnInit() {
    console.log('init ListaComponent');
    this.route.data.subscribe(
      (data) => {
        this.lista = data.lista;
        this.size = this.lista.length;
        this.listaPaginata = this.buildPage();
        console.log(this.listaPaginata);
      }
    );
  }

  applicaFiltro(filtro: string) {
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
    this.filter = null;
    this.size = this.lista.length;
    this.listaPaginata = this.buildPage();
  }

  nuova() {
    console.log('nuovo andamento');
    this.andamentoSelected = undefined;
    this.mostraPopupModifica = true;
    this.titoloModale = 'Nuova voce di spesa';
  }

  modifica(item: Andamento): void {
    console.log('modifica');
    this.andamentoSelected = {
      id: item.id,
      giorno: new Date(item.giorno),
      descrizione: item.descrizione,
      costo: item.costo,
      tipoSpesa: {
        id: item.tipoSpesa.id,
        descrizione: item.tipoSpesa.descrizione
      }
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Modifica voce di spesa';
  }

  clona(item: Andamento): void {
    console.log('clona');
    this.andamentoSelected = {
      giorno: new Date(),
      descrizione: item.descrizione,
      costo: item.costo,
      tipoSpesa: {
        id: item.tipoSpesa.id,
        descrizione: item.tipoSpesa.descrizione
      }
    };
    this.mostraPopupModifica = true;
    this.titoloModale = 'Clona voce di spesa';
  }

  async salva(andamento: Andamento) {
    try {
      if (isNil(andamento.id)) {
        await this.andamentoService.inserisci(andamento).toPromise();
        this.mostraPopupModifica = false;
        const title = 'Nuova voce di spesa';
        const message = 'Nuova voce di spesa inserita correttamente';
        this.sharedService.notifica(globals.toastType.success, title, message);
      } else {
        await this.andamentoService.modifica(andamento).toPromise();
        this.mostraPopupModifica = false;
        const title = 'Modifica voce di spesa';
        const message = 'Voce di spesa modificata correttamente';
        this.sharedService.notifica(globals.toastType.success, title, message);
      }
      this.andamentoSelected = undefined;
      this.andamentoService.lista().subscribe(
        (lista: Andamento[]) => {
          this.lista = lista;
          this.applicaFiltro(this.filter);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  annulla(): void {
    this.mostraPopupModifica = false;
  }

  apriPopupElimina(andamento: Andamento) {
    this.andamentoSelected = andamento;
    this.popupConfermaElimina.apriModale();
  }

  async confermaElimina(andamento: Andamento) {
    try {
      if (this.andamentoSelected) {
        await this.andamentoService.elimina(this.andamentoSelected.id).toPromise();
        this.popupConfermaElimina.chiudiModale();
        const title = 'Voce di spesa eliminata';
        const message = 'La voce di spesa è stata eliminata correttamente';
        this.sharedService.notifica(globals.toastType.success, title, message);
        this.andamentoSelected = undefined;

        this.andamentoService.lista().subscribe(
          (lista: Andamento[]) => {
            this.lista = lista;
            this.applicaFiltro(this.filter);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  abilitaPaginazione() {
    return !_.isEmpty(this.lista) && this.lista.length > this.pageSize;
  }

  pageChange(event) {
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
    console.log('sortByGiornoAsc');
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item1.giorno, item2.giorno);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByGiornoAsc = true;
  }

  sortByGiornoDesc() {
    console.log('sortByGiornoDesc');
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item2.giorno, item1.giorno);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByGiornoDesc = true;
  }

  sortByDescrizioneAsc() {
    console.log('sortByDescrizioneAsc');
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item1.descrizione, item2.descrizione);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByDescrizioneAsc = true;
  }

  sortByDescrizioneDesc() {
    console.log('sortByDescrizioneDesc');
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(true, item2.descrizione, item1.descrizione);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByDescrizioneDesc = true;
  }

  sortByCostoAsc() {
    console.log('sortByCostoAsc');
    this.lista.sort((item1: Andamento, item2: Andamento) => {
      return this.compare(false, item1.costo, item2.costo);
    });
    this.listaPaginata = this.buildPage();
    this.clearAllSortIcons();
    this.sortedByCostoAsc = true;
  }

  sortByCostoDesc() {
    console.log('sortByCostoDesc');
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
