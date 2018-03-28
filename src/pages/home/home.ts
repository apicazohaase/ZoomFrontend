import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente';
import { KeyboardPage } from '../keyboard/keyboard';
import { MousePage } from '../mouse/mouse';

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
  dateToPrint:any;
  

  constructor(public api:ApiClientService, public navCtrl: NavController) {
    this.productList = [];
    /* Get all the products from the blockchain and add them to the productList */
    this.api.getAllProducts().subscribe(
      result=>{
        this.productList = result.body;
        console.log(result.body);
        console.log("Hola");
        console.log("Productos ->" + '' + this.productList);
      },
      error=>{
        console.log(error);
      });
    //this.nombreProductoOferta = this.productList[0].name;
    //this.precioProductoOferta = this.productList[0].price + "€";

    

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
    this.navCtrl.push(KeyboardPage);
  }
  
  mouse(){
    this.navCtrl.push(MousePage);
  }


}