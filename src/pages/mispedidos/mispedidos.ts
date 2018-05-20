import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-mispedidos',
  templateUrl: 'mispedidos.html',
})
export class MispedidosPage {
  
  user: any;
  public id:any;
  public misPedidos = new Array();
  noHayPedidos:boolean;

  constructor(public api:ApiClientService,private storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.noHayPedidos = false;
    this.storage.get('user').then((result)=>{
      console.log(result);
      this.user=result;
      this.id = result.defaultUser.split("#")[1];
      console.log(this.id);
      this.api.getOrdersOfAClient(this.id).subscribe(
        result=>{
          this.misPedidos = result.body;
          if(result.body.length == 0 ){
            this.noHayPedidos = true;
          }
          for(var i=0;i<result.body.length;i++){
            if(result.body[i].product == "resource:zoom.app.Product#1"){
              this.misPedidos[i].product = 'Logitech G Pro';
            }else if(result.body[i].product == "resource:zoom.app.Product#2"){
              this.misPedidos[i].product = 'Logitech G213';
            }else if(result.body[i].product == "resource:zoom.app.Product#3"){
              this.misPedidos[i].product = 'ASUS MX239H';
            }else if(result.body[i].product == "resource:zoom.app.Product#4"){
              this.misPedidos[i].product = 'Logitech G430';
            }
          }
          console.log(this.misPedidos);
        },
        error=>{
          console.log(error);
        });
    })

    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MispedidosPage');
  }

}
