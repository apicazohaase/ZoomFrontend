import { HomePage } from '../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Nav, App } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login-loader-client',
  templateUrl: 'login-loader-client.html',
})
export class LoginLoaderClientPage {
  idPerson: any;
  log: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.log = this.navParams.data;
    console.log(this.navParams.data);
    this.idPerson = this.log.defaultUser.split("#")[1];
    console.log(this.idPerson);
    console.log('ionViewDidLoad LoginLoaderPage');

    var this1=this;
    setTimeout(function () {

      this1.navCtrl.setRoot(HomePage);


    }, 3000);
  }

}