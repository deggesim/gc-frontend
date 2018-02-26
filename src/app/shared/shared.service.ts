import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { itLocale } from 'ngx-bootstrap/locale';

import { Tipologica } from './../model/tipologica';
import * as globals from './globals';

@Injectable()
export class SharedService {

  private bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
  };
  private tavola_mesi = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  private tavola_omocodie = {
    'L': '0',
    'M': '1',
    'N': '2',
    'P': '3',
    'Q': '4',
    'R': '5',
    'S': '6',
    'T': '7',
    'U': '8',
    'V': '9'
  };

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private localeService: BsLocaleService
  ) {
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
    // Possible values: default, bootstrap, material
    this.toastyConfig.position = 'top-right';
    defineLocale('it', itLocale);
    this.localeService.use('it');
  }

  public getBsConfig(): Partial<BsDatepickerConfig> {
    return this.bsConfig;
  }

  public notifica(type: string, title: string, message: string) {
    const toastOptions: ToastOptions = {
      title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap'
    };
    this.toastyService[type](toastOptions);
  }

  public compareTipologica(tipo1: Tipologica, tipo2: Tipologica) {
    if (!_.isEmpty(tipo1) && !_.isEmpty(tipo2)) {
      return _.isEqual(tipo1.codice, tipo2.codice);
    } else {
      return false;
    }
  }

  notifyError(response: HttpErrorResponse) {
    // let titolo;
    // let descrizione = '';
    const tipoOperazione = 'alert';
    console.error(response);

    if (response.error instanceof Error) {
      console.log('Client-side error occured.');
    } else {
      console.log('Server-side error occured.');
    }


    // switch (response.status) {
    //   case -1:
    //   case 0:
    //   case 401:
    //   case 405:
    //     titolo = 'Utente non autorizzato';
    //     descrizione = 'L\'utente non è autorizzato ad eseguire l\'operazione richiesta';
    //     break;
    //   case 403:
    //     titolo = 'Utente non autorizzato';
    //     descrizione = 'L\'utente non è autorizzato ad eseguire l\'operazione richiesta';
    //     break;
    //   case 422:
    //     titolo = 'Errori nella validazione';
    //     let messaggio422 = response.json();
    //     if (messaggio422 === undefined) {
    //       messaggio422 = this.getMessaggiErrore(response.text());
    //     }
    //     _.forEach(messaggio422, function (e) {
    //       descrizione += e + '. ';
    //     });
    //     break;
    //   case 500:
    //     titolo = 'Errore server';

    //     let messaggio500 = response.json();
    //     if (messaggio500 === undefined) {
    //       messaggio500 = this.getMessaggiErrore(response.text());
    //     }
    //     if (messaggio500 === undefined) {
    //       descrizione = 'Si è verificato un errore imprevisto';
    //     } else {
    //       _.forEach(messaggio500, function (e) {
    //         descrizione += e + '. ';
    //       });
    //     }
    //     break;
    //   default:
    //     titolo = 'Problema generico';
    //     descrizione = 'Si è verificato un errore imprevisto';
    //     break;
    // }

    // this.notifica(globals.toastType.error, titolo, descrizione);
  }

  notifyErrorDownload(response: Response) {
    let titolo;
    let descrizione = '';
    const tipoOperazione = 'alert';
    titolo = 'Errore server';
    descrizione = 'Si è verificato un problema nel download del documento';
    this.notifica(globals.toastType.error, titolo, descrizione);
  }

  getMessaggiErrore(erroreStringa) {
    const indexStartArray = erroreStringa.indexOf('[\"');
    const indexEndArray = erroreStringa.lastIndexOf('\"]');
    console.log('start : ' + indexStartArray);
    console.log('end : ' + indexEndArray);
    let messaggio = [];
    if (indexStartArray !== -1 && indexEndArray !== -1) {
      const errori = erroreStringa.substring(indexStartArray + 2, indexEndArray);
      console.log('stringa errori : ' + errori);
      messaggio = errori.split('\",\"');
    } else {
      messaggio = erroreStringa;
    }
    console.log('messaggio : ' + messaggio);
    return messaggio;
  }

  /**************************************
			Controllo del Codice Fiscale
			Linguaggio: JavaScript
		***************************************/
  controlloCF(cf: string) {
    let validi, i, s, set1, set2, setpari, setdisp;
    if (!cf) {
      return '';
    }
    if (cf === '') {
      return '';
    }
    cf = cf.toUpperCase();
    if (cf.length !== 16) {
      return 'La lunghezza del codice fiscale non è corretta: il codice fiscale dovrebbe essere lungo esattamente 16 caratteri.';
    }

    if (cf.match('\\b(\\w)\\1+\\b')) {
      return 'Il codice fiscale non è corretto';
    }

    validi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (i = 0; i < 16; i++) {
      if (validi.indexOf(cf.charAt(i)) === -1) {
        return 'Il codice fiscale contiene un carattere non valido ' + cf.charAt(i) + '. I caratteri validi sono le lettere e le cifre.';
      }
    }
    set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setpari = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setdisp = 'BAKPLCQDREVOSFTGUHMINJWZYX';
    s = 0;

    for (i = 1; i <= 13; i += 2) {
      s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    }
    for (i = 0; i <= 14; i += 2) {
      s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    }
    if (s % 26 !== cf.charCodeAt(15) - 'A'.charCodeAt(0)) {
      return 'Il codice fiscale non  corretto:\nil codice di controllo non corrisponde.\n';
    }

    return '';
  }

  /*****************************************
    Controllo della Partita I.V.A.
    Linguaggio: JavaScript
  ******************************************/
  controlloPIVA(pi) {
    let validi, i, s, c;
    if (!pi) {
      return '';
    }
    if (pi === '') {
      return '';
    }
    if (pi.length !== 11) {
      return 'La lunghezza della partita IVA non è corretta: la partita IVA dovrebbe essere lunga esattamente 11 caratteri.';
    }
    validi = '0123456789';
    for (i = 0; i < 11; i++) {
      if (validi.indexOf(pi.charAt(i)) === -1) {
        return 'La partita IVA contiene un carattere non valido ' + pi.charAt(i) + 'I caratteri validi sono le cifre.';
      }
    }
    s = 0;
    for (i = 0; i <= 9; i += 2) {
      s += pi.charCodeAt(i) - '0'.charCodeAt(0);
    }
    for (i = 1; i <= 9; i += 2) {
      c = 2 * (pi.charCodeAt(i) - '0'.charCodeAt(0));
      if (c > 9) {
        c = c - 9;
      }
      s += c;
    }
    if ((10 - s % 10) % 10 !== pi.charCodeAt(10) - '0'.charCodeAt(0)) {
      return 'La partita IVA non  valida:\nil codice di controllo non corrisponde.\n';
    }
    return '';
  }

  verificaDatiAnagrafici(nome, cognome, sesso, giorno, mese, anno, cf, codComune) {
    const cCognome = this._codiceCognome(cognome);
    if (cCognome !== cf.substr(0, 3)) {
      return false;
    }
    const cNome = this._codiceNome(nome);
    if (cNome !== cf.substr(3, 3)) {
      return false;
    }
    const cData = this._codiceData(giorno, mese, anno, sesso);
    const dataCF = cf.substr(6, 5);
    const ggCF = dataCF.substr(0, 2).replaceAll(this.tavola_omocodie);
    const mmCF = dataCF.substr(2, 1);
    const yyyyCF = dataCF.substr(3, 2).replaceAll(this.tavola_omocodie);

    if (cData !== ggCF + mmCF + yyyyCF) {
      return false;
    }

    // controllo codice catastale comune
    const codComuneCF1 = cf.substr(11, 1);
    const codComuneCF2 = cf.substr(12, 3).replaceAll(this.tavola_omocodie);
    if (codComune && !_.isEqual(codComuneCF1 + codComuneCF2, codComune)) {
      return false;
    }

    return true;
  }

  minorenne(dataNascita, dataDecorrenza) {
    const dataPartenza = (dataDecorrenza !== undefined ? dataDecorrenza : new Date());
    if (dataPartenza !== undefined && dataNascita !== undefined) {
      const eta = new Date(dataPartenza - dataNascita).getFullYear() - 1970;
      if (eta < 18) {
        return true;
      } else {
        return false;
      }
    }
  }

  minoreDi(anni, dataNascita, dataDecorrenza) {
    const dataPartenza = (dataDecorrenza !== undefined ? dataDecorrenza : new Date());
    if (dataPartenza !== undefined && dataNascita !== undefined) {
      const eta = new Date(dataPartenza - dataNascita).getFullYear() - 1970;
      if (eta < anni) {
        return true;
      } else {
        return false;
      }
    }
  }

  codifica(input: any): string {
    const inputBase64 = btoa('' + input);
    const inputEncoded = encodeURIComponent(inputBase64);
    return inputEncoded;
  }

  decodifica(input: string): string {
    return atob(input);
  }

  getFilename(response: Response): string {
    let filename = '';
    const headers = response.headers;
    const contentDisposition = headers.get('content-disposition');
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }
    return filename;
  }

  private _ottieniConsonanti(str) {
    return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '');
  }

  private _ottieniVocali(str) {
    return str.replace(/[^AEIOU]/gi, '');
  }

  private _codiceCognome(cognome) {
    let codice_cognome = this._ottieniConsonanti(cognome);
    codice_cognome += this._ottieniVocali(cognome);
    codice_cognome += 'XXX';
    codice_cognome = codice_cognome.substr(0, 3);
    return codice_cognome.toUpperCase();
  }

  private _codiceNome(nome) {
    let codice_nome = this._ottieniConsonanti(nome);
    if (codice_nome.length >= 4) {
      codice_nome = codice_nome.charAt(0) + codice_nome.charAt(2) + codice_nome.charAt(3);
    } else {
      codice_nome += this._ottieniVocali(nome);
      codice_nome += 'XXX';
      codice_nome = codice_nome.substr(0, 3);
    }
    return codice_nome.toUpperCase();
  }

  private _codiceData(gg, mm, aa, sesso) {
    if (gg < 10) {
      gg = '0' + gg;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    const d = moment('' + gg + mm + aa, 'DDMMYYYY').toDate();

    let anno = '0' + d.getFullYear();
    anno = anno.substr(anno.length - 2, 2);
    const mese = this.tavola_mesi[d.getMonth()];
    let ggCf = d.getDate();
    if (sesso.toUpperCase() === 'F') {
      ggCf += 40;
    }
    let giorno = '0' + ggCf;
    giorno = giorno.substr(giorno.length - 2, 2);
    return '' + anno + mese + giorno;
  }
}
