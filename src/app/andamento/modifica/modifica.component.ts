import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { Andamento } from '../../model/andamento';
import { TipoSpesa } from '../../model/tipo-spesa';
import { TipoSpesaService } from '../../services/tipo-spesa.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'gc-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss'],
})
export class ModificaComponent implements OnInit, OnChanges {
  @Input() andamento: Andamento | undefined;
  @Output() salva: EventEmitter<Andamento> = new EventEmitter(true);
  @Output() annulla: EventEmitter<void> = new EventEmitter(true);

  listaTipoSpesa: TipoSpesa[] = [];

  form = this.fb.group({
    id: [null as number | null],
    giorno: [null as Date | null, Validators.required],
    descrizione: [null as string | null, Validators.required],
    costo: [null as number | null, [Validators.required, Validators.min(0.01)]],
    tipoSpesa: [null as TipoSpesa | null, Validators.required],
  });

  constructor(private fb: FormBuilder, public sharedService: SharedService, private tipoSpesaService: TipoSpesaService) {}

  ngOnInit() {
    this.tipoSpesaService.lista().subscribe((lista: TipoSpesa[]) => {
      this.listaTipoSpesa = lista;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const andamento: Andamento = changes['andamento'].currentValue;
    if (!isNil(andamento)) {
      const day: Date = DateTime.fromJSDate(andamento.giorno).startOf('day').toJSDate();
      this.form.patchValue({
        id: andamento.id,
        giorno: day,
        descrizione: andamento.descrizione,
        costo: andamento.costo,
        tipoSpesa: andamento.tipoSpesa,
      });
    } else {
      this.form.get('giorno')?.setValue(DateTime.now().startOf('day').toJSDate());
    }
  }

  clearGiorno() {
    this.form.get('giorno')?.reset();
    this.form.get('giorno')?.updateValueAndValidity();
  }

  salvaAndamento(): void {
    if (this.form.valid) {
      const andamento: Andamento = {
        id: this.form.value.id,
        giorno: this.form.value.giorno as Date,
        descrizione: this.form.value.descrizione as string,
        costo: this.form.value.costo as number,
        tipoSpesa: this.form.value.tipoSpesa as TipoSpesa,
      };
      this.salva.emit(andamento);
    }
  }
}
