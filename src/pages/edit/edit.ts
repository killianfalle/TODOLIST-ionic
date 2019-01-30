import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Service } from '../../app/services/service';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  birthItems: any;
  wedItems: any;
  christItems: any;
  myProducts: any;
  isSearchbarOpened = false;
  isItemSearchbarOpened = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public itemService: Service) {
              this.birthItems=navParams.get('item');
              this.christItems=navParams.get('item2');
              this.wedItems=navParams.get('item3');
              this.myProducts=navParams.get('products');
              }

  ionViewDidLoad() {
    console.log(this.birthItems);
    console.log(this.christItems);
    console.log(this.wedItems);
    console.log(this.myProducts);
  }

  updateItem(item){
    this.itemService.updateItem(item);
    const toast = this.toastCtrl.create({
      message: 'Successfully updated item!',
      duration: 3000
    });
    toast.present();
  }
}
