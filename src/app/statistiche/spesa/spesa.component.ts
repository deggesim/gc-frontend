import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { forEach, isEqual } from 'lodash-es';
import * as moment from 'moment';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'gc-spesa',
  templateUrl: './spesa.component.html',
  styleUrls: ['./spesa.component.scss'],
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

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private statisticheService: StatisticheService) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.barreSpesa = data['barreSpesa'];
      forEach(this.barreSpesa, (item: Statistica) => {
        let mese = item.name;
        mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
        item.name = mese;
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      frequenza: ['M', Validators.required],
    });

    this.form.get('frequenza')?.valueChanges.subscribe((value: string) => {
      this.statisticheService.spesa(value).subscribe((data: Statistica[]) => {
        this.barreSpesa = data;
        if (this.mensile()) {
          forEach(this.barreSpesa, (item: Statistica) => {
            let mese = item.name;
            mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
            item.name = mese;
          });
        }
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
