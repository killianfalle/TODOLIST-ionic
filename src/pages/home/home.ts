import { Component } from '@angular/core';
import { NavController,AlertController, ToastController, MenuController  } from 'ionic-angular';

import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../app/models/user';
import { Item } from '../../app/models/item';
import { Service } from '../../app/services/service';
import { BudgettingPage } from '../budgetting/budgetting';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  birthItems: any;
  user = {} as User;
  items: Item[];

  isSearchbarOpened = false;

  constructor(public navCtrl: NavController,
              public itemService:Service,
              private alertCtrl: AlertController,
              private authAf: AngularFireAuth,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public menu: MenuController) {
                
                //to disable side-menu on login page 
                this.menu.enable(false, 'myMenu');

                this.itemService.getBirthItems().subscribe(birthItems => {
                  this.birthItems = birthItems;
                  console.log(this.birthItems);
                });

              }

  async login(user: User){
    this.authAf.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(data=>{
      this.navCtrl.setRoot(BudgettingPage,{
        birthItems: this.birthItems
      });

      this.toast('Welcome! ');
      this.alert('Select an inclusion(s) that you want to update.');
    })
    .catch(error =>{
      this.alert(error.message);
    })
  }

  alert(message: string){
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  toast(message: string){
    this.toastCtrl.create({
      message: message + this.user.email,
      duration: 3000
    }).present();
  }

}
