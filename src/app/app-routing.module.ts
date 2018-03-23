import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './andamento/lista/lista.component';
import { HomeComponent } from './home/home.component';
import { BollettaMensileResolver } from './services/resolvers/bolletta-mensile-resolver';
import { CarburanteMensileResolver } from './services/resolvers/carburante-mensile-resolver';
import { ListaAndamentoResolver } from './services/resolvers/lista-andamento-resolver';
import { SpesaMensileResolver } from './services/resolvers/spesa-mensile-resolver';
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
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path: 'lista',
        component: ListaComponent,
        resolve: {
            lista: ListaAndamentoResolver
        },
        data: {
            breadcrumb: 'Lista'
        }
    },
    {
        path: 'statistiche',
        component: StatisticheComponent,
        data: {
            breadcrumb: 'Statistiche'
        },
        children: [
            {
                path: 'spese-frequenti',
                component: SpeseFrequentiComponent,
                resolve: {
                    tortaTipiSpesa: SpeseFrequentiResolver
                },
                data: {
                    breadcrumb: 'Lista'
                }
            },
            {
                path: 'spesa',
                component: SpesaComponent,
                resolve: {
                    barreSpesa: SpesaMensileResolver
                },
                data: {
                    breadcrumb: 'Spesa'
                }
            },
            {
                path: 'carburante',
                component: CarburanteComponent,
                resolve: {
                    barreCarburante: CarburanteMensileResolver
                },
                data: {
                    breadcrumb: 'Carburante'
                }
            },
            {
                path: 'bolletta',
                component: BollettaComponent,
                resolve: {
                    barreBolletta: BollettaMensileResolver
                },
                data: {
                    breadcrumb: 'Bollette'
                }
            }
        ]
    },
    { path: 'error', component: ErrorPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class AppRoutingModule { }
