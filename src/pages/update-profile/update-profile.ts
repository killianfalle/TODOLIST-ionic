import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Service } from '../../app/services/service';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';
import { Item } from '../../app/models/item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  advertisers:any;
  categories: any;
  email:any;
  token: BehaviorSubject<string>;
  idTok: any;
  myProducts: any=[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service :Service,
              public toastCtrl: ToastController,
              private view: ViewController, 
              public authAf: AngularFireAuth,
              public afs: AngularFirestore,
              ) {
  this.advertisers=navParams.get('advertisers');
  this.email = this.authAf.auth.currentUser;
  console.log(this.advertisers)
  }

  ionViewDidLoad(){
    this.products();
  }

  saveProfile(advertiser){
    this.email.updateEmail(advertiser.email);
    
    this.service.updateAdvertiser(advertiser);
    const toast = this.toastCtrl.create({
      message: 'Successfully updated user!',
      duration: 3000
    });
    toast.present();
    this.view.dismiss();
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


}
