import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { forEach, isEqual } from 'lodash-es';
import { DateTime } from 'luxon';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'gc-spesa',
  templateUrl: './spesa.component.html',
})
export class SpesaComponent implements OnInit {
  // opzioni barre
  ScaleType = ScaleType;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreSpesa: Statistica[] = [];

  form = this.fb.group({
    frequenza: ['M', Validators.required],
  });

  constructor(private route: ActivatedRoute, private fb: NonNullableFormBuilder, private statisticheService: StatisticheService) {}

  ngOnInit() {
    this.form.get('frequenza')?.valueChanges.subscribe((value: string) => {
      this.statisticheService.spesa(value).subscribe((data: Statistica[]) => {
        this.barreSpesa = data;
        if (this.mensile()) {
          forEach(this.barreSpesa, (item: Statistica) => {
            let mese = item.name;
            const dateTime = DateTime.fromFormat(mese, 'yyyyMM');
            mese = DateTime.fromFormat(mese, 'yyyyMM').setLocale('it-IT').toFormat('MMMM yyyy');
            item.name = mese;
          });
        }
      });
    });

    this.route.data.subscribe((data: Data) => {
      this.barreSpesa = data['barreSpesa'];
      forEach(this.barreSpesa, (item: Statistica) => {
        let mese = item.name;
        mese = DateTime.fromFormat(mese, 'yyyyMM').setLocale('it-IT').toFormat('MMMM yyyy');
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
