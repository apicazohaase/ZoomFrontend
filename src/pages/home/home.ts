import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyprofilePage } from '../myprofile/myprofile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }

}
