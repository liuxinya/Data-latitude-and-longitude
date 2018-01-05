import { NgModule } from '@angular/core';
import { TitleBarComponent } from './title-bar.component';
import { LittleItemComponent } from './little-item.component';

@NgModule({
  declarations: [
    TitleBarComponent,
    LittleItemComponent
  ],
  imports: [

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
