import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { EditPage } from '../edit/edit';
import { Item } from '../../app/models/item';
import { HomePage } from '../home/home';
import { ItemDetailsPage } from '../item-details/item-details';
import { MenuController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../app/services/service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@IonicPage()
@Component({
  selector: 'page-budgetting',
  templateUrl: 'budgetting.html',
})
export class BudgettingPage {

  checked: any;
  birthItems: any;
  categories: any;
  christItems: any;
  wedItems: any;
  selectedItem: any;
  color:string="#009688";
  username: any;
  advertisers: any;
  quantity: any = [];

  items: Item[];
  isSearchbarOpened = false;
  idTok: any;
  token: BehaviorSubject<string>;

  myProducts: any=[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public authAf: AngularFireAuth,
              public menuCtrl: MenuController,
              public itemService: Service,
              public alertCtrl: AlertController,
              public afs: AngularFirestore,
              public loadingCtrl: LoadingController
              ) {   
    // this.checked=navParams.get('data');
    // this.birthItems=navParams.get('birthItems');
    this.advertisers=navParams.get('advertisers');
    // this.christItems=navParams.get('christItems');
    // this.wedItems=navParams.get('wedItems');

    // this.itemService.getProducts().subscribe(birthItems => {
    //   this.birthItems = birthItems;
    //   console.log(this.birthItems);
    // });
    this.username = this.authAf.auth.currentUser.email;
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad(){
    this.products();
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait...',
      duration: 1500
    });
      loading.present();
  }

  products(){
    this.token = new BehaviorSubject<string>(this.authAf.auth.currentUser.uid);
    this.idTok = this.authAf.auth.currentUser.uid;

    let get = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<Item>('categories', ref=> ref.where('userIDs', 'array-contains', token))
          .valueChanges()
        )
    );

    get.subscribe(categories=>{
      this.categories = categories
      console.log(this.categories);

      //TO DELETE THOSE ITEMS THAT ARE NOT INCLUDED BY THE ADVERTISER'S BUSINESS
      for(var i=0; i<this.categories.length; i++){
        var element = this.categories[i].itemList.itemName;
        for(var e=0; e<element.length; e++){
          var el = element[e].userId;
          if(el == this.idTok){
            this.myProducts = element[e];
            console.log(this.myProducts);
            // element.splice(e, 1)
          }else{
            console.log('Nothing.')
          }
        }
      }
    })
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
      item: this.categories,
      products: this.myProducts
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
