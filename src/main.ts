import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { TranslateService } from 'app/translate/translate.service';

let _translate: TranslateService;

if (environment.production) {
  enableProdMode();
}

// let test = "lol";

platformBrowserDynamic().bootstrapModule(AppModule);
