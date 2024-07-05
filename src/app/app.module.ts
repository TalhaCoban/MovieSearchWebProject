import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shrared.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesModule } from './movies/movies.module';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';


registerLocaleData(localeTr, 'tr');
@NgModule({
  declarations: [
    AppComponent,
  ],
 imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    MoviesModule,
    AppRoutingModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'tr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
