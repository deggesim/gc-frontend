import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BarChartModule, ScaleType } from '@swimlane/ngx-charts';
import { forEach, isEqual } from 'lodash-es';
import { DateTime } from 'luxon';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'gc-casa',
  templateUrl: './casa.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgClass, BarChartModule],
})
export class CasaComponent implements OnInit {
  // opzioni barre
  ScaleType = ScaleType;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreCasa: Statistica[] = [];

  form = this.fb.group({
    frequenza: ['M', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private statisticheService: StatisticheService
  ) {}

  ngOnInit() {
    this.form.get('frequenza')?.valueChanges.subscribe((value: string) => {
      this.statisticheService.casa(value).subscribe((data: Statistica[]) => {
        this.barreCasa = data;
        if (this.mensile()) {
          forEach(this.barreCasa, (item: Statistica) => {
            let mese = item.name;
            mese = DateTime.fromFormat(mese, 'yyyyMM')
              .setLocale('it-IT')
              .toFormat('MMMM yyyy');
            item.name = mese;
          });
        }
      });
    });

    this.route.data.subscribe((data: Data) => {
      this.barreCasa = data['barreCasa'];
      forEach(this.barreCasa, (item: Statistica) => {
        let mese = item.name;
        mese = DateTime.fromFormat(mese, 'yyyyMM')
          .setLocale('it-IT')
          .toFormat('MMMM yyyy');
        item.name = mese;
      });
    });
  }

  xAxisTickFormatting(value: number | bigint): string {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }

  mensile(): boolean {
    return isEqual(this.form.value.frequenza, 'M');
  }

  annuale(): boolean {
    return isEqual(this.form.value.frequenza, 'Y');
  }
}
