import { NgModule } from '@angular/core';
import { TitleBarComponent } from './title-bar.component';
import { LittleItemComponent } from './little-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { TrumpComponent } from './trump.component';

@NgModule({
  declarations: [
    TitleBarComponent,
    LittleItemComponent,
    TrumpComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    TitleBarComponent,
    LittleItemComponent,
    TrumpComponent,
  ],
  entryComponents: [
    TitleBarComponent,
    TrumpComponent,
    LittleItemComponent
  ]
})
export class ComponentsModule {

}
