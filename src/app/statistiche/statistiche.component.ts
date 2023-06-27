import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, RoutesRecognized } from '@angular/router';
import { forEach } from 'lodash-es';
import { DateTime } from 'luxon';
import { Statistica } from '../model/statistica';

@Component({
  selector: 'gc-statistiche',
  templateUrl: './statistiche.component.html',
})
export class StatisticheComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  showMainPage = true;

  bolletteAnnuali: Statistica[] = [];
  mediaBollettaMensile: Statistica[] = [];

  speseAnnuali: Statistica[] = [];
  mediaSpesaMensile: Statistica[] = [];

  carburanteAnnuale: Statistica[] = [];
  mediaCarburanteMensile: Statistica[] = [];

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
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    //   if (event instanceof RoutesRecognized) {
    //     const routeData = event.state.root.firstChild?.data;

    //     if (routeData) {
    //       this.showMainPage = routeData['showMainPage'] === false ? false : true;
    //     }
    //   }
    // });

    if (this.route.children.length != 0) {
      this.showMainPage = false;
    }

    this.route.data.subscribe((data: Data) => {
      console.log(data);

      console.log('this.showMainPage', this.showMainPage);

      this.bolletteAnnuali = data['bolletteAnnuali'];
      this.speseAnnuali = data['speseAnnuali'];
      this.carburanteAnnuale = data['carburanteAnnuale'];

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();

      forEach(
        this.bolletteAnnuali.filter((item) => +item.name > currentYear - 10),
        (item: Statistica) => {
          let monthDivider = 12;
          if (+item.name === currentYear) {
            monthDivider = currentMonth + 1;
          }
          const media = { name: item.name, value: item.value / monthDivider };
          this.mediaBollettaMensile.push(media);
        }
      );

      forEach(
        this.speseAnnuali.filter((item) => +item.name > currentYear - 10),
        (item: Statistica) => {
          let monthDivider = 12;
          if (+item.name === currentYear) {
            monthDivider = currentMonth + 1;
          }
          const media = { name: item.name, value: item.value / monthDivider };
          this.mediaSpesaMensile.push(media);
        }
      );

      forEach(
        this.carburanteAnnuale.filter((item) => +item.name > currentYear - 10),
        (item: Statistica) => {
          let monthDivider = 12;
          if (+item.name === currentYear) {
            monthDivider = currentMonth + 1;
          }
          const media = { name: item.name, value: item.value / monthDivider };
          this.mediaCarburanteMensile.push(media);
        }
      );
    });
  }
}
