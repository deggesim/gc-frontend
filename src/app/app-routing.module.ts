import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './andamento/lista/lista.component';
import { HomeComponent } from './home/home.component';
import { ListaAndamentoResolver } from './services/resolvers/lista-andamento-resolver';
import { SpesaMensileResolver } from './services/resolvers/spesa-mensile-resolver.service';
import { SpeseFrequentiResolver } from './services/resolvers/spese-frequenti-resolver.service';
import { ErrorPageComponent } from './shared/error-page.component';
import { SpesaMensileComponent } from './statistiche/spesa-mensile/spesa-mensile.component';
import { SpeseFrequentiComponent } from './statistiche/spese-frequenti/spese-frequenti.component';

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
        path: 'spesa-mensile',
        component: SpesaMensileComponent,
        resolve: {
            barreSpesaMensile: SpesaMensileResolver
        },
        data: {
            breadcrumb: 'Lista'
        }
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
