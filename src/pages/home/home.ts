import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente';
import { KeyboardPage } from '../keyboard/keyboard';
import { MousePage } from '../mouse/mouse';
import { AuricularesPage } from '../auriculares/auriculares';
import { AnonymousSubject } from 'rxjs/Subject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productList = new Array();
  nombreProductoOferta:string;
  precioProductoOferta:any;
  countDownDate:any;
  x:any;
  
  name1:any;
  name2:any;
  name3:any;
  name4:any;

  price1:any;
  price2:any;
  price3:any;
  price4:any;

  visible1:boolean;
  visible2:boolean;
  visible3:boolean;
  visible4:boolean;
  person:any;
  personId:any;
  public data:any;
  public nombre:any;

  constructor(public events:Events, public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    //this.productList = [];
    /* Get all the products from the blockchain and add them to the productList */
/*
    this.events.subscribe('userInfo', (userInfo)=>{
      this.data=userInfo;
      this.nombre = userInfo.body.name;
      console.log(userInfo.body.name);
    });*/
    this.api.getProducts().subscribe(
      result=>{
        //this.productList = result.body;
        this.name1 = result.body[0].name;
        this.name2 = result.body[1].name;
        this.name3 = result.body[2].name;
        this.name4 = result.body[3].name;
    
        this.price1 = result.body[0].price + '' + '€';
        this.price2 = result.body[1].price + '' + '€';
        this.price3 = result.body[2].price + '' + '€';
        this.price4= result.body[3].price + '' + '€';

        if(result.body[0].status == 'NOTSOLD'){
          this.visible1=true;
        }else{
          this.visible1=false;
        }
        if(result.body[1].status == 'NOTSOLD'){
          this.visible2=true;
        }else{
          this.visible2=false;
        }
        if(result.body[2].status == 'NOTSOLD'){
          this.visible3=true;
        }else{
          this.visible3=false;
        }
        if(result.body[3].status == 'NOTSOLD'){
          this.visible4=true;
        }else{
          this.visible4=false;
        }
        console.log(result.body[0].status);
      },
      error=>{
        console.log(error);
      });

  }

  ionViewDidLoad(){
    this.person = this.navParams.data;
    let idLong = this.person.defaultUser;
    let splitted = idLong.split("#");
    this.personId = splitted[1];
    console.log(this.person);
    console.log(this.personId);
  }

  ngOnInit(){
    /*
    this.countDownDate = new Date("Mar 29, 2018 12:37:25").getTime();

    // Update the count down every 1 second
    
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = this.countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
         document.getElementById(dateRemaining).innerHTML =  this.dateToPrint= "Termina en " + days + ":" + hours + ":"
        + minutes + ":" + seconds;
    console.log(this.dateToPrint); 
    */
  }

  keyboard(){
    this.navCtrl.push(KeyboardPage,this.personId);
  }
  
  mouse(){
    this.navCtrl.push(MousePage,this.personId);
  }

  auriculares(){
    this.navCtrl.push(AuricularesPage,this.personId);
  }


}