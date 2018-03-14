import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'app-spese-frequenti',
  templateUrl: './spese-frequenti.component.html',
  styleUrls: ['./spese-frequenti.component.scss']
})
export class SpeseFrequentiComponent implements OnInit {

  // opzioni torta
  showLegend = true;
  showLabels = true;

  tortaTipiSpesa: Statistica[];

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private statisticheService: StatisticheService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('init TipiSpesaComponent');
    this.route.data.subscribe(
      (data) => {
        this.tortaTipiSpesa = data.tortaTipiSpesa;
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      range: ['M', Validators.required]
    });

    this.form.controls.range.valueChanges.subscribe(
      (value: string) => {
        console.log('value = ' + value);
        this.statisticheService.speseFrequenti(value).subscribe(
          (data: Statistica[]) => { this.tortaTipiSpesa = data; }
        );
      }
    );
  }

  refresh() {
    this.statisticheService.speseFrequenti(this.form.value.range).subscribe(
      (data: Statistica[]) => { this.tortaTipiSpesa = data; }
    );
  }

  tooltipTorta(arg: any) {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });

    const formattedValue = formatter.format(arg.value);
    return '<b>' + arg.data.name + '</b>: ' + formattedValue;
  }

  onSelectTorta(event) {
    console.log(event);
  }

}
