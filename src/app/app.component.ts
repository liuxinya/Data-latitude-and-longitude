import { ImportantJobs } from '../pages/important-jobs/important-jobs';
import { Merchant } from './../pages/merchant/merchant';
import { UpchatStatusObject } from './../services/upchat.service';
import { ReceiptPage } from './../pages/receipt/receipt';
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CardIssuersPage } from '../pages/card-issuers/card-issuers';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { UpchatService } from '../services/upchat.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  cardPage: any = CardIssuersPage;
  receipt: any = ReceiptPage;
  merchant :any = Merchant
  importantJobs: any = ImportantJobs
  safe = false;
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private loadingCtrl: LoadingController,
    private _upchat: UpchatService
  ) {
    this.init()
  }
  async init() {
    await this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let loading  = await this.loadingCtrl.create({
        content: '安全检查中...'
    });
    await loading.present();
    await this._upchat.checkSecurity().then((_result: UpchatStatusObject) => {
      if(_result.state) {
        this.safe = true;
      } else {
        alert(_result.msg);
      }
    });
    await loading.dismiss();
  }
}

