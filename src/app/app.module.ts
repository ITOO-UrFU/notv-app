import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { PageService } from 'app/page.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
