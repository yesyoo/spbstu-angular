import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RestInterceptorsService } from './services/interceptors/rest-interceptors.service'
import { ConfigService } from './services/config/config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [

    ConfigService,
    
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp, // ожидаем функцию initializeApp
      deps: [ConfigService], // зависимости initializeApp
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: RestInterceptorsService,  // ожидаем массив экземпляров класса RestInterceptorsService
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}
