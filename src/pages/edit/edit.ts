import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Service } from '../../app/services/service';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  checked: any;
  isSearchbarOpened = false;
  isItemSearchbarOpened = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public itemService: Service) {
              this.checked=navParams.get('item');
              }

  ionViewDidLoad() {
    console.log(this.checked);
  }

  addItem(item){
    this.itemService.updateItem(item);
    const toast = this.toastCtrl.create({
      message: 'Successfully updated item!',
      duration: 3000
    });
    toast.present();
  }
}
