import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { itLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import * as globals from './globals';

@Injectable()
export class SharedService {
  private bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-green',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
  };

  constructor(private localeService: BsLocaleService, private toastr: ToastrService) {
    defineLocale('it', itLocale);
    this.localeService.use('it');
  }

  public getBsConfig(): Partial<BsDatepickerConfig> {
    return this.bsConfig;
  }

  public notifica(type: string, title: string, message: string) {
    switch (type) {
      case 'show':
        this.toastr.show(message, title);
        break;

      case 'success':
        this.toastr.success(message, title);
        break;

      case 'error':
        this.toastr.error(message, title);
        break;

      case 'info':
        this.toastr.info(message, title);
        break;

      case 'warning':
        this.toastr.warning(message, title);
        break;

      default:
        break;
    }
  }

  notifyError(response: HttpErrorResponse): string {
    let titolo = '';
    let descrizione = '';
    console.error(response);
    const error = typeof response.error === 'string' ? response.error : '';
    const message = typeof response.message === 'string' ? response.message : '';

    switch (response.status) {
      case 401:
        titolo = 'Utente non loggato';
        descrizione = error || message || "L'utente non è loggato o la sessione è scaduta";
        break;
      case 403:
        titolo = 'Utente non autorizzato';
        descrizione = error || message || "L'utente non è autorizzato ad eseguire l'operazione richiesta";
        break;
      case 400:
        titolo = 'Errore nella richiesta';
        descrizione = error || message || 'I dati inseriti sono errati';
        break;
      case 422:
        titolo = 'Errori nella validazione';
        descrizione = error || message;
        break;
      case 500:
        titolo = 'Errore server';
        descrizione = error || message || 'Si è verificato un errore imprevisto';
        break;
      default:
        titolo = 'Problema generico';
        descrizione = error || message || 'Si è verificato un errore imprevisto';
        break;
    }

    this.notifica(globals.toastType.error, titolo, descrizione);
    return descrizione;
  }

  notifyErrorDownload() {
    const titolo = 'Errore server';
    const descrizione = 'Si è verificato un problema nel download del documento';
    this.notifica(globals.toastType.error, titolo, descrizione);
  }
}
