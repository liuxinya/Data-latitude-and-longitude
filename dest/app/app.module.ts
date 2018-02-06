import { ReceiptService } from './../services/receipt/receipt';
import { ReceiptPage } from './../pages/receipt/receipt';
import { CardIssuersService } from './../services/card-issuers/card-issuers.service';
import { CircleItemComponent } from './../containers/circle-item.component';
import { EchartsBasicComponent } from './../containers/echarts.component';
import { PickKeyPipe } from './../pipes/pickKey';
import { BasicChooseComponent } from './../containers/basic-choose.component';
import { BasicConditionDataModelSerive } from './../model/BasicConditionData';
import { ConstantService } from './../services/constant.service';
import { FlagService } from './../services/flag.service';
import { ToggleExpandComponent } from './../containers/toggle-expand.component';
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
import { NetService } from '../services/net.service';
import { HttpModule } from '@angular/http';
import { MoneyPipe } from '../pipes/money';
import { HomePageService } from '../services/home/main-page.service';
import { BasicQueryConditionService } from '../services/BasicQueryCondition.service';
import { PercentagePipe } from '../pipes/percentage';
import { RecentDaysDataComponent } from '../modules/recent-days-data';
import { EchartsDataComponent } from '../containers/echarts.component';
import { MultiPickerModule } from 'ion-multi-picker';
import { UpchatService } from '../services/upchat.service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CardIssuersPage,
    BlockItemComponent,
    BlockItemStateComponent,
    TableDataComponent,
    ToggleExpandComponent,
    MoneyPipe,
    BasicChooseComponent,
    PickKeyPipe,
    RecentDaysDataComponent,
    PercentagePipe,
    EchartsBasicComponent,
    EchartsDataComponent,
    CircleItemComponent,
    ReceiptPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CardIssuersPage,
    BlockItemStateComponent,
    TableDataComponent,
    ToggleExpandComponent,
    RecentDaysDataComponent,
    BasicChooseComponent,
    EchartsBasicComponent,
    EchartsDataComponent,
    ReceiptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HomePageService,
    NetService,
    FlagService,
    ConstantService,
    BasicQueryConditionService,
    BasicConditionDataModelSerive,
    CardIssuersService,
    ReceiptService,
    UpchatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
