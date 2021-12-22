import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { forEach, isEqual } from 'lodash-es';
import * as moment from 'moment';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'gc-carburante',
  templateUrl: './carburante.component.html',
  styleUrls: ['./carburante.component.scss'],
})
export class CarburanteComponent implements OnInit {
  // opzioni barre
  ScaleType = ScaleType;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreCarburante: Statistica[] = [];

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private statisticheService: StatisticheService) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.barreCarburante = data['barreCarburante'];
      this.formatMese();
    });
  }

  private formatMese() {
    forEach(this.barreCarburante, (item: Statistica) => {
      let mese = item.name;
      mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
      item.name = mese;
    });
  }

  createForm() {
    this.form = this.fb.group({
      frequenza: ['M', Validators.required],
    });

    this.form.get('frequenza')?.valueChanges.subscribe((value: string) => {
      this.statisticheService.carburante(value).subscribe((data: Statistica[]) => {
        this.barreCarburante = data;
        if (this.mensile()) {
          this.formatMese();
        }
      });
    });
  }

  xAxisTickFormatting(value: number | bigint) {
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
