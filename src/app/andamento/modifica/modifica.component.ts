import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

import * as _ from 'lodash';
import { Andamento } from '../../model/andamento';
import { TipoSpesa } from '../../model/tipo-spesa';
import { TipoSpesaService } from '../../services/tipo-spesa.service';


@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements OnInit, OnChanges {

  @Input() andamento: Andamento;
  @Output() salva: EventEmitter<any> = new EventEmitter(true);
  @Output() annulla: EventEmitter<any> = new EventEmitter(true);

  listaTipoSpesa: TipoSpesa[];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public sharedService: SharedService,
    private tipoSpesaService: TipoSpesaService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('ModificaComponent');
    this.tipoSpesaService.lista().subscribe(
      (lista: TipoSpesa[]) => { this.listaTipoSpesa = lista; }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const andamento: Andamento = changes['andamento'].currentValue;
    if (!_.isEmpty(andamento)) {
      this.form.patchValue({
        giorno: andamento.giorno,
        descrizione: andamento.descrizione,
        costo: andamento.costo,
        tipoSpesa: andamento.tipoSpesa
      });
    } else {
      this.form.controls.giorno.setValue(new Date());
    }
  }

  createForm() {
    this.form = this.fb.group({
      giorno: [undefined, Validators.required],
      descrizione: [undefined, Validators.required],
      costo: [undefined, Validators.required],
      tipoSpesa: [undefined, Validators.required]
    });
  }

  clearGiorno() {
    this.form.controls.giorno.reset();
  }

  salvaAndamento(): void {
    console.log('salvaAndamento');
    const andamento: Andamento = {
      giorno: this.form.value.giorno,
      descrizione: this.form.value.descrizione,
      costo: this.form.value.costo,
      tipoSpesa: this.form.value.tipoSpesa
    };
    this.salva.emit(andamento);
  }

}
