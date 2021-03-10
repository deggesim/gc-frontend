import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNil } from 'lodash-es';
import * as moment from 'moment';
import { Andamento } from '../../model/andamento';
import { TipoSpesa } from '../../model/tipo-spesa';
import { TipoSpesaService } from '../../services/tipo-spesa.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss'],
})
export class ModificaComponent implements OnInit, OnChanges {
  @Input() andamento: Andamento;
  @Output() salva: EventEmitter<any> = new EventEmitter(true);
  @Output() annulla: EventEmitter<any> = new EventEmitter(true);

  listaTipoSpesa: TipoSpesa[];

  form: FormGroup;

  constructor(private fb: FormBuilder, public sharedService: SharedService, private tipoSpesaService: TipoSpesaService) {
    this.createForm();
  }

  ngOnInit() {
    this.tipoSpesaService.lista().subscribe((lista: TipoSpesa[]) => {
      this.listaTipoSpesa = lista;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const andamento: Andamento = changes['andamento'].currentValue;
    if (!isNil(andamento)) {
      const day: Date = moment(andamento.giorno).startOf('day').toDate();
      this.form.patchValue({
        id: andamento.id,
        giorno: day,
        descrizione: andamento.descrizione,
        costo: andamento.costo,
        tipoSpesa: andamento.tipoSpesa,
      });
    } else {
      this.form.controls.giorno.setValue(moment().startOf('day').toDate());
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: undefined,
      giorno: [undefined, Validators.required],
      descrizione: [undefined, Validators.required],
      costo: [undefined, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d{1,2})?$')]],
      tipoSpesa: [undefined, Validators.required],
    });
  }

  clearGiorno() {
    this.form.controls.giorno.reset();
  }

  salvaAndamento(): void {
    const andamento: Andamento = {
      id: this.form.value.id,
      giorno: this.form.value.giorno,
      descrizione: this.form.value.descrizione,
      costo: this.form.value.costo,
      tipoSpesa: this.form.value.tipoSpesa,
    };
    this.salva.emit(andamento);
  }
}
