import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
