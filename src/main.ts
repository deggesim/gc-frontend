import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import it from '@angular/common/locales/it';
import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
import {
  NgxCurrencyDirective,
  NgxCurrencyInputMode,
  provideEnvironmentNgxCurrency,
} from 'ngx-currency';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { AuthInterceptor } from './app/http-interceptors/auth-interceptor.service';
import { GlobalInterceptor } from './app/http-interceptors/global-interceptor.service';
import { AndamentoService } from './app/services/andamento.service';
import { AppUpdateService } from './app/services/app-update.service';
import { AuthService } from './app/services/auth.service';
import { BollettaResolver } from './app/services/resolvers/bolletta-resolver';
import { CarburanteResolver } from './app/services/resolvers/carburante-resolver';
import { CasaResolver } from './app/services/resolvers/casa-resolver';
import { ListaAndamentoResolver } from './app/services/resolvers/lista-andamento-resolver';
import { SpesaResolver } from './app/services/resolvers/spesa-resolver';
import { SpeseFrequentiResolver } from './app/services/resolvers/spese-frequenti-resolver';
import { StatisticheCompleteResolver } from './app/services/resolvers/statistiche-complete-resolver';
import { StatisticheService } from './app/services/statistiche.service';
import { TipoSpesaService } from './app/services/tipo-spesa.service';
import { SharedService } from './app/shared/shared.service';
import { SpinnerService } from './app/shared/spinner.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(it, 'it-IT');

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
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
      NgxCurrencyDirective,
      NgxChartsModule,
      ToastrModule.forRoot(),
      FontAwesomeModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    provideEnvironmentNgxCurrency({
      align: 'right',
      allowNegative: false,
      allowZero: false,
      decimal: ',',
      precision: 2,
      prefix: '€ ',
      suffix: '',
      thousands: '.',
      nullable: false,
      inputMode: NgxCurrencyInputMode.Financial,
    }),
    // resolver
    ListaAndamentoResolver,
    SpeseFrequentiResolver,
    SpesaResolver,
    CarburanteResolver,
    BollettaResolver,
    CasaResolver,
    StatisticheCompleteResolver,
    // altri servizi
    AndamentoService,
    TipoSpesaService,
    StatisticheService,
    SpinnerService,
    SharedService,
    AuthService,
    AppUpdateService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
