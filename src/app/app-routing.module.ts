import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './andamento/lista/lista.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { BollettaResolver } from './services/resolvers/bolletta-resolver';
import { CarburanteResolver } from './services/resolvers/carburante-resolver';
import { ListaAndamentoResolver } from './services/resolvers/lista-andamento-resolver';
import { SpesaResolver } from './services/resolvers/spesa-resolver';
import { SpeseFrequentiResolver } from './services/resolvers/spese-frequenti-resolver';
import { ErrorPageComponent } from './shared/error-page.component';
import { BollettaComponent } from './statistiche/bolletta/bolletta.component';
import { CarburanteComponent } from './statistiche/carburante/carburante.component';
import { SpesaComponent } from './statistiche/spesa/spesa.component';
import { SpeseFrequentiComponent } from './statistiche/spese-frequenti/spese-frequenti.component';
import { StatisticheComponent } from './statistiche/statistiche.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'lista',
    component: ListaComponent,
    resolve: { lista: ListaAndamentoResolver },
    data: {
      breadcrumb: 'Lista',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'statistiche',
    component: StatisticheComponent,
    resolve: {
      bolletteAnnuali: BollettaResolver,
      speseAnnuali: SpesaResolver,
      carburanteAnnuale: CarburanteResolver,
    },
    data: { breadcrumb: 'Statistiche', period: 'Y' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'spese-frequenti',
        component: SpeseFrequentiComponent,
        resolve: { tortaTipiSpesa: SpeseFrequentiResolver },
        data: { breadcrumb: 'Lista', period: 'M' },
        canActivate: [AuthGuard],
      },
      {
        path: 'spesa',
        component: SpesaComponent,
        resolve: { barreSpesa: SpesaResolver },
        data: { breadcrumb: 'Spesa', period: 'M' },
        canActivate: [AuthGuard],
      },
      {
        path: 'carburante',
        component: CarburanteComponent,
        resolve: { barreCarburante: CarburanteResolver },
        data: { breadcrumb: 'Carburante', period: 'M' },
        canActivate: [AuthGuard],
      },
      {
        path: 'bolletta',
        component: BollettaComponent,
        resolve: { barreBolletta: BollettaResolver },
        data: { breadcrumb: 'Bollette', period: 'M', showMainPage: false },
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
