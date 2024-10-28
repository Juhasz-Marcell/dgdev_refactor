import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if(environment.consoleLogEnabled){
  console.log("In Development mode!");
}else{
  window.console.log = () => {};
  window.console.table = () => {};
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
