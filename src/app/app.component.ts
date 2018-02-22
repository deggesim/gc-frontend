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
    private router: Router,
    public spinnerService: SpinnerService,
  ) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    console.log('ngOnInit AppComponent');
  }

  ngAfterViewChecked(): void {
    this.loading = this.spinnerService.isLoading();
    this.cdRef.detectChanges();
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.spinnerService.start();
      console.log('NavigationStart.url -> [' + event.url + ']');
    }
    if (event instanceof NavigationEnd) {
      this.spinnerService.end();
      console.log('NavigationEnd.urlAfterRedirects -> [' + event.urlAfterRedirects + ']');
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.spinnerService.end();
      console.log('NavigationCancel.reason -> [' + event.reason + ']');
    }
    if (event instanceof NavigationError) {
      this.spinnerService.end();
      console.log('NavigationError.error -> [' + event.error + ']');
    }
  }

}
