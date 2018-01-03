import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasicComponent } from '../../basic.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasicComponent {

  constructor(public navCtrl: NavController) {
    super();
  }
}
