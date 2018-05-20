import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  user:any;
  idPersona:any;
  metodoPago:any;
  id:any;
  visaBool:boolean;
  paypalBool:boolean;
  canWrite:boolean;
  tarjetaUser:any;
  correoUser:any;

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,private injector: Injector, public modalCtrl: ModalController,public viewCtrl: ViewController,
    private storage:Storage, public api:ApiClientService, public events:Events, public navParams: NavParams) {
    console.log(this.navParams.data);
    this.viewCtrl = viewCtrl;
    this.paypalBool=false;
    this.visaBool=false;
    this.canWrite=false;
  }

  ionViewDidLoad() {
    this.id = this.navParams.data.id;
    console.log(this.id);
    console.log('ionViewDidLoad ModalPage');
    this.storage.get('user').then((result)=>{
      console.log(result);
      this.user=result;
      this.idPersona = result.defaultUser.split("#")[1];
      this.api.getClient(this.idPersona).subscribe(
        result=>{
          this.tarjetaUser = result.body.tarjetaCredito.substring(0,4) + "**************";
          this.correoUser = result.body.mail;
      })
  })
}

onSelectChange(selectedValue:any){
  if(this.metodoPago=="paypal"){
    this.paypalBool=true;
    this.visaBool=false;
  }else if(this.metodoPago=="visa"){
    this.paypalBool=false;
    this.visaBool=true;
  }
  
}

dismissAlert() {
  console.log("Hola");
  this.viewCtrl.dismiss();
  console.log("Hola1");
}

  comprar(){
    let loading = this.loadingCtrl.create({
      content: 'Procesando compra...'
    });

    loading.present();

    let compra = {
      
        "$class": "zoom.app.BuyAProduct",
        "client": "resource:zoom.app.Client#" + this.idPersona,
        "transport": "resource:zoom.app.Transport#1",
        "vendor": "resource:zoom.app.Vendor#1",
        "product": "resource:zoom.app.Product#" + this.id
      };
      this.api.compraDeProducto(compra).subscribe(
        result=>{
          this.events.publish('ordersMade');
          console.log("Success");
          loading.dismiss();
          this.viewCtrl.dismiss();
        },
        error=>{
          console.log(error)
        });
    

  }

}
