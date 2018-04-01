import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
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
  idLargo:any;

  constructor(public events:Events, private barCodeScanner: BarcodeScanner, private toast:Toast, public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.pedidosAEntregar = [];
    this.events.publish('ordersInfo');
    this.events.subscribe('ordersInfo',
    ordersInfo=>{
      console.log("Amoss");
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
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportistaPage');
  }
/*
  click(pedido){
    this.readQR(pedido);
  }
*/
  readQR(pedido){
    //this.id = pedido.id;
    this.receiveData = {};
    console.log("Entrando en funcion");
    this.barCodeScanner.scan().then((barcodeData)=>{
      this.id = barcodeData.text;
      console.log("ID " + this.id);
      this.idLargo = "resource:zoom.app.Order#" + this.id;
      console.log(this.idLargo);
      console.log("barcodeData" + '' + barcodeData);
      console.log("barcodeDataText" + '' + barcodeData.text)
      console.log("Entrando en scanning");
      console.log("Cambio");

      

      if(pedido.status == 'CONFIRMED'){
        this.receiveData = {
        
          "$class": "zoom.app.ChangeStatusToInTransit",
          "order": this.idLargo
        
      }
        this.api.changeStatusToInTransit(this.receiveData).subscribe(
          result=>{
            this.events.publish('ordersInfo');
            console.log(result);
          },
          error=>{
            console.log(error);
          });
      }
      if(pedido.status == 'INTRANSIT'){
        this.receiveData = {
        
          "$class": "zoom.app.ChangeStatusToDelivered",
          "order": this.idLargo
        
      }
      this.api.changeStatusToDelivered(barcodeData.text).subscribe(
        result=>{
          this.events.publish('ordersInfo');
          console.log(result);
        },
        error=>{
          console.log(error);
        });
      }
    }, (error)=>{
      console.log(error);
      this.toast.show(`Product not found`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        });
  });

}
}
