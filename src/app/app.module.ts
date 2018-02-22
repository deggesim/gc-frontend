import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as moment from 'moment';
import { ToastyModule } from 'ng2-toasty';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { ErrorPageComponent } from './shared/error-page.component';
import { NotaComponent } from './shared/nota/nota.component';
import { NotificheComponent } from './shared/notifiche/notifiche.component';
import { PopupConfermaComponent } from './shared/popup-conferma/popup-conferma.component';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopupConfermaComponent,
    NotaComponent,
    NotificheComponent,
    ErrorPageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    ToastyModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    // altri servizi
    SpinnerService,
    SharedService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    moment.locale('it');
  }
}
