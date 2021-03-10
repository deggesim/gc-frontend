import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forEach, isEqual } from 'lodash-es';
import * as moment from 'moment';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'app-carburante',
  templateUrl: './carburante.component.html',
  styleUrls: ['./carburante.component.scss'],
})
export class CarburanteComponent implements OnInit {
  // opzioni barre
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreCarburante: Statistica[] = [];

  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private statisticheService: StatisticheService) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.barreCarburante = data.barreCarburante;
      forEach(this.barreCarburante, (item: Statistica) => {
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

    this.form.controls.frequenza.valueChanges.subscribe((value: string) => {
      this.statisticheService.carburante(value).subscribe((data: Statistica[]) => {
        this.barreCarburante = data;
        if (this.mensile()) {
          forEach(this.barreCarburante, (item: Statistica) => {
            let mese = item.name;
            mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
            item.name = mese;
          });
        }
      });
    });
  }

  xAxisTickFormatting(value) {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const retValue = formatter.format(value);
    return retValue;
  }

  mensile(): boolean {
    return isEqual(this.form.value.frequenza, 'M');
  }

  annuale(): boolean {
    return isEqual(this.form.value.frequenza, 'Y');
  }
}
