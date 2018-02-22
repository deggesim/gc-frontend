import { Component, OnInit } from '@angular/core';

import { SharedService } from './../shared.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) {

  }

  ngOnInit() {
  }

}
