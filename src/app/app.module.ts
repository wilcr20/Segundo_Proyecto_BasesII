import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { AppComponent } from './app.component';
import { IngresoCentralComponent } from './components/ingreso-central/ingreso-central.component';
import { HomeComponent } from './components/home/home.component';


import {APP_ROUTING} from '../app/app.routes'; //imporat archivo de rutas

@NgModule({
  declarations: [
    AppComponent,
    IngresoCentralComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    APP_ROUTING,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
