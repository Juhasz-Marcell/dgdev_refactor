import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'fooldal', component: MainPageComponent },

  { path: '', redirectTo: 'fooldal', pathMatch: 'full' },
  { path: '**', redirectTo: 'fooldal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
