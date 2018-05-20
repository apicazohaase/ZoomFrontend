import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente';
import { KeyboardPage } from '../keyboard/keyboard';
import { MousePage } from '../mouse/mouse';
import { AuricularesPage } from '../auriculares/auriculares';
import { AnonymousSubject } from 'rxjs/Subject';
import { OfertaPage } from '../oferta/oferta';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productList = new Array();
  nombreProductoOferta: string;
  precioProductoOferta: any;
  countDownDate: any;
  x: any;

  name1: any;
  name2: any;
  name3: any;
  name4: any;

  price1: any;
  price2: any;
  price3: any;
  price4: any;

  visible1: boolean;
  visible2: boolean;
  visible3: boolean;
  visible4: boolean;
  person: any;
  personId: any;
  public data: any;
  public nombre: any;

  dAux: any;
  hAux: any;
  mAux: any;
  sAux: any;

  user:any;

  constructor(public events: Events, private storage:Storage, public api: ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    //this.productList = [];
    /* Get all the products from the blockchain and add them to the productList */
    /*
        this.events.subscribe('userInfo', (userInfo)=>{
          this.data=userInfo;
          this.nombre = userInfo.body.name;
          console.log(userInfo.body.name);
        });*/
    
    

    this.api.getProducts().subscribe(
      result => {
        //this.productList = result.body;
        this.name1 = result.body[0].name;
        this.name2 = result.body[1].name;
        this.name3 = result.body[2].name;
        this.name4 = result.body[3].name;

        this.price1 = result.body[0].price + '' + '€';
        this.price2 = result.body[1].price + '' + '€';
        this.price3 = result.body[2].price + '' + '€';
        this.price4 = result.body[3].price + '' + '€';

        if (result.body[0].status == 'NOTSOLD') {
          this.visible1 = true;
        } else {
          this.visible1 = false;
        }
        if (result.body[1].status == 'NOTSOLD') {
          this.visible2 = true;
        } else {
          this.visible2 = false;
        }
        if (result.body[2].status == 'NOTSOLD') {
          this.visible3 = true;
        } else {
          this.visible3 = false;
        }
        if (result.body[3].status == 'NOTSOLD') {
          this.visible4 = true;
        } else {
          this.visible4 = false;
        }
        console.log(result.body[0].status);
      },
      error => {
        console.log(error);
      });

  }

  ionViewDidLoad() {
    this.storage.get('user').then((result)=>{
      console.log(result);
      this.user=result;
      this.personId = result.defaultUser.split("#")[1];
      console.log(this.personId);

    })
  }
  
  


  ofertaPage() {
    this.navCtrl.push(OfertaPage, this.personId);
  }

  keyboard() {
    this.navCtrl.push(KeyboardPage, this.personId);
  }

  mouse() {
    this.navCtrl.push(MousePage, this.personId);
  }

  auriculares() {
    this.navCtrl.push(AuricularesPage, this.personId);
  }


}