import { NgModule } from '@angular/core';
import { TitleBarComponent } from './title-bar.component';
import { LittleItemComponent } from './little-item.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TitleBarComponent,
    LittleItemComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    TitleBarComponent,
    LittleItemComponent
  ],
  entryComponents: [
    TitleBarComponent,
    LittleItemComponent
  ]
})
export class ComponentsModule {

}
