import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HufCurrencyPipe } from './pipes/huf-currency.pipe';
import { LoaderModule } from './modules/loader/loader.module';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HufCurrencyPipe,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoaderModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
