import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-transportista',
  templateUrl: 'transportista.html',
})
export class TransportistaPage {
  receiveData:any;
  id:any
  public pedidosAEntregar = new Array();

  constructor(private barCodeScanner: BarcodeScanner, private toast:Toast, public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.pedidosAEntregar = [];
    this.api.getAllOrders().subscribe(
      result=>{
        this.pedidosAEntregar = result.body;
        for(var i=0;i<result.body.length;i++){
          if(result.body[i].product == "resource:zoom.app.Product#1"){
            this.pedidosAEntregar[i].product = 'Logitech G Pro';
          }else if(result.body[i].product == "resource:zoom.app.Product#2"){
            this.pedidosAEntregar[i].product = 'Logitech G213';
          }else if(result.body[i].product == "resource:zoom.app.Product#3"){
            this.pedidosAEntregar[i].product = 'ASUS MX239H';
          }else if(result.body[i].product == "resource:zoom.app.Product#4"){
            this.pedidosAEntregar[i].product = 'Logitech G430';
          }
        }
        console.log(this.pedidosAEntregar);
      },
      error=>{
        console.log(error);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportistaPage');
  }

  click(pedido){
    this.readQR(pedido);
  }

  readQR(pedido){
    this.id = pedido.id;
    this.receiveData = {};
    this.barCodeScanner.scan().then((barcodeData)=>{
      this.receiveData = barcodeData.text;

      if(pedido.status == 'CONFIRMED'){
        this.api.changeStatusToInTransit(this.receiveData).subscribe(
          result=>{
            console.log(result);
          },
          error=>{
            console.log(error);
          });
      }
      if(pedido.status == 'INTRANSIT'){
      this.api.changeStatusToDelivered(this.receiveData).subscribe(
        result=>{
          console.log(result);
        },
        error=>{
          console.log(error);
        });
      }
    }, (err)=>{
      this.toast.show(`Product not found`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        });
  });

}
}
