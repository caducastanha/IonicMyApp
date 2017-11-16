import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nome_usuario:string = "Cadu Castanha";

  constructor(public navCtrl: NavController) {

  }

}
