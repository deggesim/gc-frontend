import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './shared/error-page.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            breadcrumb: 'Home'
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
