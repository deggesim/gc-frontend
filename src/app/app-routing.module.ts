import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './andamento/lista/lista.component';
import { HomeComponent } from './home/home.component';
import { ListaAndamentoResolver } from './services/resolvers/lista-andamento-resolver';
import { ErrorPageComponent } from './shared/error-page.component';

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
