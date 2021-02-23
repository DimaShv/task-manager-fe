import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthCodeComponent } from './auth/auth-code/auth-code.component';
import { HeaderComponent } from './header/header.component';
import {AuthInterceptor} from './auth/auth-interseptor';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskCardComponent } from './task/task-list/task-card/task-card.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthCodeComponent,
    HeaderComponent,
    TaskListComponent,
    TaskCardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
