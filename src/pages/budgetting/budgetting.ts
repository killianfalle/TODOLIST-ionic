import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { EditPage } from '../edit/edit';
import { Item } from '../../app/models/item';
import { HomePage } from '../home/home';
import { ItemDetailsPage } from '../item-details/item-details';
import { MenuController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../app/services/service';

@IonicPage()
@Component({
  selector: 'page-budgetting',
  templateUrl: 'budgetting.html',
})
export class BudgettingPage {

  checked: any;
  birthItems: any;
  christItems: any;
  wedItems: any;
  selectedItem: any;
  color:string="#009688";
  username: any;

  items: Item[];
  isSearchbarOpened = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public authAf: AngularFireAuth,
              public menuCtrl: MenuController,
              public itemService: Service
              ) {   
    // this.checked=navParams.get('data');
    this.birthItems=navParams.get('birthItems');
    this.christItems=navParams.get('christItems');
    this.wedItems=navParams.get('wedItems');

    this.username = this.authAf.auth.currentUser.email;

    this.menuCtrl.enable(true, 'myMenu');
  }

  logout(){
    const toast = this.toastCtrl.create({
      message: 'Thank You Advertiser!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  openMenu(){
    this.menuCtrl.open();
  }
  
  imgDetail(item){
    this.navCtrl.push(ItemDetailsPage,{
      data: item.name,
      itemDetail: item.itemDetails
    });
  }
  

  edit(){
    this.navCtrl.push(EditPage, {
      item: this.birthItems,
    })
  }

  addItem(item){
    this.itemService.addItem(item);
    const toast = this.toastCtrl.create({
      message: 'Successfully updated item!',
      duration: 3000
    });
    toast.present();
  }

}
