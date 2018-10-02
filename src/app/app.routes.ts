import {RouterModule, Routes} from '@angular/router';
import { IngresoCentralComponent } from './components/ingreso-central/ingreso-central.component';
import {HomeComponent} from'./components/home/home.component';


// arreglo de rutas
const APP_ROUTES: Routes =[
    { path: 'ingreso', component: IngresoCentralComponent},
    { path: 'home', component: HomeComponent},
    { path: '**',pathMatch: 'full', redirectTo:'ingreso' }
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);
