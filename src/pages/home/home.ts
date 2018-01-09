import { BasicQueryConditionObject } from './../../interfaces/BasicQueryConditionObject';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasicComponent } from '../../basic.component';
import { HomePageService } from '../../services/home/main-page.service';
import { BasicInfoObject } from '../../interfaces/BasicInfoObject';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RecentDaysSummaryObject } from '../../interfaces/home/RecentDaysSummaryObject';
import { EchartsDataObject } from '../../containers/echarts.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasicComponent {

  constructor(
      public navCtrl: NavController,
      private _main: HomePageService,
      public loadingCtrl: LoadingController
    ) {
    super();
  }
  @ViewChild('tabs') tabsRef: Tabs;
  todayData: BasicInfoObject = {
    count: 0,
    amount: 0,
    income: 0
  };
  comparisonData: BasicInfoObject = {
    count: 0,
    amount: 0,
    income: 0
  };
  recentDaysData: RecentDaysSummaryObject[] = [];
  increaseData: EchartsDataObject;
  /**
   * 选择框的处理事件  在初始化的时候会默认调一次
   */
  basicChooseHandler(basicQuery: BasicQueryConditionObject) {
    // 获取数据
    this.initData();
  }
  // 初始化Home页的数据
  async initData() {
    /**
     * 异步的请求所有的数据
     */
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
    await Promise.all([
      this._main.getSummaryData()
      .then((data: BasicInfoObject) => {
        this.todayData = data;
      }),
      this._main.getComparisonData()
      .then((data: BasicInfoObject) => {
        this.comparisonData = data;
      }),
      this._main.getRecentDaysSummaryData()
      .then((data: RecentDaysSummaryObject[]) => {
        this.recentDaysData = data;
      }),
      this._main.getIncreaseData()
      .then((data: EchartsDataObject) => {
        this.increaseData = data;
      })
    ])
    .then((results: any[]) => {
      loading.dismiss();
    })
    .catch(() => {
      loading.dismiss();
    })
  }
}
