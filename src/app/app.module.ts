import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CardIssuersPage } from '../pages/card-issuers/card-issuers';
import { ComponentsModule } from '../components/components.module';
import { BlockItemComponent } from '../containers/block-item.component';
import { BlockItemStateComponent } from '../containers/block-item-state.component';
import { TableDataComponent } from '../containers/table-data.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CardIssuersPage,
    BlockItemComponent,
    BlockItemStateComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CardIssuersPage,
    BlockItemStateComponent,
    TableDataComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
