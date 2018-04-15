import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-transportista',
  templateUrl: 'transportista.html',
})
export class TransportistaPage {
  receiveData:any;
  id:any
  pedidoSeleccionado = new Array();
  public pedidosAEntregar = new Array();
  idLargo:any;

  constructor(public events:Events, public alertCtrl:AlertController,private barCodeScanner: BarcodeScanner, private toast:Toast, public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.pedidosAEntregar = [];
    this.pedidoSeleccionado = [];
    this.events.publish('ordersInfo');
    this.api.getAllOrders().subscribe(
      result=>{
        console.log("Hola");
        this.pedidosAEntregar = result.body;
        
        console.log(result.body);
        console.log("STATUS " + this.pedidosAEntregar[0].status)
        for(var i=0;i<result.body.length;i++){
          let comprador = result.body[i].client.split('#');
          let idComprador = comprador[1];
          this.pedidosAEntregar[i].client =  idComprador;

          let vendedor = result.body[i].client.split('#');
          let idVendedor = comprador[1];
          this.pedidosAEntregar[i].owner =  idVendedor;
          
          console.log(this.pedidosAEntregar[i].client);
          if(result.body[i].product == "resource:zoom.app.Product#1"){
            this.pedidosAEntregar[i].product = 'Logitech G Pro';
          }else if(result.body[i].product == "resource:zoom.app.Product#2"){
            this.pedidosAEntregar[i].product = 'Logitech G213';
          }else if(result.body[i].product == "resource:zoom.app.Product#3"){
            this.pedidosAEntregar[i].product = 'ASUS MX239H';
          }else if(result.body[i].product == "resource:zoom.app.Product#4"){
            this.pedidosAEntregar[i].product = 'Logitech G430';
          }
          
          console.log('IDCOMPRADOR ' + idComprador); 
          
          console.log('IDCOMPRADOR2 ' + this.pedidosAEntregar[i].client); 
        }
        this.events.publish('ordersInfo',result.body);
        console.log(this.pedidosAEntregar[0].product);
}, error=>{
        console.log(error);
      });

      this.events.subscribe('ordersInfo',
    (ordersInfo)=>{
      console.log("DATA " + ordersInfo);
      this.api.getAllOrders().subscribe(
        result=>{
          console.log("Hola");
          this.pedidosAEntregar = result.body;
          console.log(result.body);
          console.log(result.body[0].product)
          for(var i=0;i<result.body.length;i++){
            let comprador = result.body[i].client.split('#');
            let idComprador = comprador[1];
            this.pedidosAEntregar[i].client =  idComprador;
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
          console.log(this.pedidosAEntregar[0].product);
  }, error=>{
          console.log(error);
        });
    
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
      console.log("Entrando en scanning");
      console.log("Cambio");

      this.api.getAnOrders(this.id).subscribe(
        result=>{
          
      if(result.body.status == 'CONFIRMED'){
        this.receiveData = {
        
          "$class": "zoom.app.ChangeStatusToInTransit",
          "order": this.idLargo
        
      }
        this.api.changeStatusToInTransit(this.receiveData).subscribe(
          result=>{
            console.log("Entra en transit");
            console.log(result.body);
            this.events.publish('ordersInfo',result.body);
            
          },
          error=>{
            console.log(error);
          });
      }
      else if(result.body.status == 'INTRANSIT'){
        this.receiveData = {
        
          "$class": "zoom.app.ChangeStatusToDelivered",
          "order": this.idLargo
        
      }
      this.api.changeStatusToDelivered(this.receiveData).subscribe(
        result=>{
          this.events.publish('ordersInfo',result.body);
          console.log(result);
        },
        error=>{
          console.log(error);
        });
      }else{
        console.log("It shouldnt get in here :/");
      }
        },error=>{
          console.log(error);
        });

    }, (error)=>{
      console.log(error);
      this.toast.show(`Product not found`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        });
  });

  
}

logout(){
  this.navCtrl.setRoot(LoginPage);
}
seguroLogOut(){
  this.presentAlert();
}
presentAlert(){
  const alert = this.alertCtrl.create({
    title: "¿Seguro que quiere salir?",
    buttons: [
      {
        text: "SI",
        role: "OK",
        handler: () => {
          this.logout();
        }
      },
      {
        text: "NO",
        role: "CANCEL"
      }
    ]
  });
  alert.present();
}

}
