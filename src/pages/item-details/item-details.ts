import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Service } from '../../app/services/service';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  checked: any;
  imageDetails: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public itemService: Service,
              public toastCtrl: ToastController) {
    this.checked=navParams.get('data');
    this.imageDetails=navParams.get('itemDetail');
  }

  // updateDetailItem(item){
  //   this.itemService.updateItem(item.id);
  //   const toast = this.toastCtrl.create({
  //     message: 'Successfully updated item!',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

}
