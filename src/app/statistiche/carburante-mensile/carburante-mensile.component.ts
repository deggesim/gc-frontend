import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Statistica } from '../../model/statistica';

@Component({
  selector: 'app-carburante-mensile',
  templateUrl: './carburante-mensile.component.html',
  styleUrls: ['./carburante-mensile.component.scss']
})
export class CarburanteMensileComponent implements OnInit {

  // opzioni barre
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreCarburanteMensile: Statistica[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('init CarburanteMensileComponent');
    this.route.data.subscribe(
      (data) => {
        this.barreCarburanteMensile = data.barreCarburanteMensile;
        _.forEach(this.barreCarburanteMensile, (item: Statistica) => {
          let mese = item.name;
          mese = moment(mese, 'YYYYMM').format('MMMM YYYY');
          item.name = mese;
        });
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

}
