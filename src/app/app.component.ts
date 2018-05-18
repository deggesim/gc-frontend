import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    public spinnerService: SpinnerService,
  ) {
  }

  ngOnInit() {
    console.log('ngOnInit AppComponent');
  }

  ngAfterViewChecked(): void {
    this.loading = this.spinnerService.isLoading();
    this.cdRef.detectChanges();
  }

}
