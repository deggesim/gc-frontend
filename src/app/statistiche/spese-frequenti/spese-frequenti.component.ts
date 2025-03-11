import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { forEach } from 'lodash-es';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'gc-spese-frequenti',
  templateUrl: './spese-frequenti.component.html',
  standalone: false,
})
export class SpeseFrequentiComponent implements OnInit {
  // opzioni torta
  showLegend!: boolean;
  showLabels!: boolean;

  tortaTipiSpesa!: Statistica[];

  form = this.fb.group({
    range: ['M', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private deviceService: DeviceDetectorService,
    private statisticheService: StatisticheService
  ) {}

  speseTotali: Statistica[] = [];
  mediaMensile: Statistica[] = [];

  format(value: number | bigint): string {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const retValue = formatter.format(value);
    return retValue;
  }

  ngOnInit() {
    this.form.get('range')?.valueChanges.subscribe((value: string) => {
      this.statisticheService
        .speseFrequenti(value)
        .subscribe((data: Statistica[]) => {
          this.tortaTipiSpesa = data;
        });
    });

    this.route.data.subscribe((data: Data) => {
      this.tortaTipiSpesa = data['tortaTipiSpesa'];
      this.speseTotali = data['speseTotali'];
    });

    this.showLabels = this.deviceService.isDesktop();
    this.showLegend =
      this.deviceService.isDesktop() || this.deviceService.isTablet();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    forEach(
      this.speseTotali.filter((item) => +item.name > currentYear - 10),
      (item: Statistica) => {
        let monthDivider = 12;
        if (+item.name === currentYear) {
          monthDivider = currentMonth + 1;
        }
        const media = { name: item.name, value: item.value / monthDivider };
        this.mediaMensile.push(media);
      }
    );
  }

  refresh() {
    this.statisticheService
      .speseFrequenti(this.form.controls.range.value)
      .subscribe((data: Statistica[]) => {
        this.tortaTipiSpesa = data;
      });
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
}
