import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as moment from 'moment';
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
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { ListaComponent } from './andamento/lista/lista.component';
import { ModificaComponent } from './andamento/modifica/modifica.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor.service';
import { GlobalInterceptor } from './http-interceptors/global-interceptor.service';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { AndamentoService } from './services/andamento.service';
import { AuthService } from './services/auth.service';
import { BollettaMensileResolver } from './services/resolvers/bolletta-mensile-resolver';
import { CarburanteMensileResolver } from './services/resolvers/carburante-mensile-resolver';
import { ListaAndamentoResolver } from './services/resolvers/lista-andamento-resolver';
import { SpesaMensileResolver } from './services/resolvers/spesa-mensile-resolver';
import { SpeseFrequentiResolver } from './services/resolvers/spese-frequenti-resolver';
import { StatisticheService } from './services/statistiche.service';
import { TipoSpesaService } from './services/tipo-spesa.service';
import { ErrorPageComponent } from './shared/error-page.component';
import { NotaComponent } from './shared/nota/nota.component';
import { PopupConfermaComponent } from './shared/popup-conferma/popup-conferma.component';
import { SharedService } from './shared/shared.service';
import { SpinnerService } from './shared/spinner.service';
import { BollettaComponent } from './statistiche/bolletta/bolletta.component';
import { CarburanteComponent } from './statistiche/carburante/carburante.component';
import { SpesaComponent } from './statistiche/spesa/spesa.component';
import { SpeseFrequentiComponent } from './statistiche/spese-frequenti/spese-frequenti.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

registerLocaleData(localeIt);

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: false,
  decimal: ',',
  precision: 2,
  prefix: '€ ',
  suffix: '',
  thousands: '.',
  nullable: false,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopupConfermaComponent,
    NotaComponent,
    ErrorPageComponent,
    HomeComponent,
    ListaComponent,
    ModificaComponent,
    SpeseFrequentiComponent,
    SpesaComponent,
    CarburanteComponent,
    BollettaComponent,
    LoginComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgSelectModule,
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
    NgxChartsModule,
    ToastrModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    // resolver
    ListaAndamentoResolver,
    SpeseFrequentiResolver,
    SpesaMensileResolver,
    CarburanteMensileResolver,
    BollettaMensileResolver,
    // altri servizi
    AndamentoService,
    TipoSpesaService,
    StatisticheService,
    SpinnerService,
    SharedService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    moment.locale('it');
  }
}
