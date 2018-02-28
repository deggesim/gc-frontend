import { Component, OnInit } from '@angular/core';
import { Statistica } from '../../model/statistica';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spesa-mensile',
  templateUrl: './spesa-mensile.component.html',
  styleUrls: ['./spesa-mensile.component.scss']
})
export class SpesaMensileComponent implements OnInit {

  // opzioni barre
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  colorScheme = {
    domain: ['#28a745', '#dc3545']
  };

  barreSpesaMensile: Statistica[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('init SpesaMensileComponent');
    this.route.data.subscribe(
      (data) => {
        this.barreSpesaMensile = data.barreSpesaMensile;
        console.log(this.barreSpesaMensile);
      }
    );
  }

}
