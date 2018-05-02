import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'app-bolletta',
  templateUrl: './bolletta.component.html',
  styleUrls: ['./bolletta.component.scss']
})
export class BollettaComponent implements OnInit {

  // opzioni barre
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreBolletta: Statistica[] = [];

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private statisticheService: StatisticheService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('init BollettaComponent');
    this.route.data.subscribe(
      (data) => {
        this.barreBolletta = data.barreBolletta;
        _.forEach(this.barreBolletta, (item: Statistica) => {
          let mese = item.name;
          mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
          item.name = mese;
        });
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      frequenza: ['M', Validators.required]
    });

    this.form.controls.frequenza.valueChanges.subscribe(
      (value: string) => {
        console.log('value = ' + value);
        this.statisticheService.bolletta(value).subscribe(
          (data: Statistica[]) => {
            this.barreBolletta = data;
            if (this.mensile()) {
              _.forEach(this.barreBolletta, (item: Statistica) => {
                let mese = item.name;
                mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
                item.name = mese;
              });
            }
          }
        );
      }
    );
  }

  xAxisTickFormatting(value) {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    const retValue = formatter.format(value);
    return retValue;
  }

  mensile(): boolean {
    return _.isEqual(this.form.value.frequenza, 'M');
  }

  annuale(): boolean {
    return _.isEqual(this.form.value.frequenza, 'Y');
  }

}