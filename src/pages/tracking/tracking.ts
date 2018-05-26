import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {
pedido:any;
value:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pedido = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    console.log(this.navParams.data);
    if(this.pedido.status == 'CONFIRMED'){
      this.value = 2;
    }else if(this.pedido.status == 'PENDING'){
      this.value = 1;
    }else if(this.pedido.status == 'INTRANSIT'){
      this.value = 3;
    }else if(this.pedido.status == 'DELIVERED'){
      this.value = 4;
    }

  }

  volver(){
    this.navCtrl.popToRoot();
  }

}
