import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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
  quantity: any = [];

  items: Item[];
  isSearchbarOpened = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public authAf: AngularFireAuth,
              public menuCtrl: MenuController,
              public itemService: Service,
              public alertCtrl: AlertController
              ) {   
    // this.checked=navParams.get('data');
    this.birthItems=navParams.get('birthItems');
    this.christItems=navParams.get('christItems');
    this.wedItems=navParams.get('wedItems');

    this.username = this.authAf.auth.currentUser.email;
    console.log(this.authAf.auth.currentUser.uid)

    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad(){
    // this.itemService.change(id);
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
      subData: item.subName,
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

  quant(item){
    
    if(item.noQty){
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'No quantity needed for this item/person.',
        buttons: ['Ok']
      });
      alert.present();
      return false;
    }

    var index = this.quantity.indexOf(item,0)   //checks what item that user wanted to input.
    let alert = this.alertCtrl.create({         //ALERTS
      
      title: 'Input Quantity',
      inputs: [
        {
          name: 'quantityInput',
          type: 'number',
          placeholder: item.qty,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            const toast = this.toastCtrl.create({     //opens toast
              message: 'Cancelled!',
              duration: 3000
            });
            toast.present();
          }
        },
        {
          text: 'Save',
          handler: (inputData) => {
            item.qty = parseInt(inputData.quantityInput);
            item.qty2 = parseFloat(inputData.quantityInput);
            
            //alerts if the user input is lesser than quantity of 1.
            if(item.qty < 1){
              let alert = this.alertCtrl.create({
                title: 'Ooops!',
                subTitle: 'Quantity is zero, please input again that is greather than 0.',
                buttons: ['Ok']
              });
              alert.present();
              return false;
            }
            //alerts if the user input is using floating-point numbers
            else if(item.qty != item.qty2){
              let alert = this.alertCtrl.create({
                title: 'Ooops!',
                subTitle: "Input invalid, quantity uses fixed numbers.",
                buttons: ['Ok']
              });
              alert.present();
              return false;
            }
            else{
              this.quantity.splice(index,1);    //splices the current quantity.
              this.quantity.push(item.qty);     //adds the new quantity input.
            }
          }
        }
      ]
    });
    alert.present();
  }

}
