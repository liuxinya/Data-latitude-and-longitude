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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  cardPage: any = CardIssuersPage;
  receipt: any = ReceiptPage;
  safe = false;
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _upchat: UpchatService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    _upchat.checkSecurity().then((_result: UpchatStatusObject) => {
      if(_result.state) {
        this.safe = true;
      } else {
        alert('1' + _result.msg);
      }
    })
  }
}

