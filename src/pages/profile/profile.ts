import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../app/models/user';
import { Item } from '../../app/models/item';
import { UpdateProfilePage } from '../update-profile/update-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  advertisers: any;
  categories: any;
  token: BehaviorSubject<string>;
  idTok: any;
  myProducts: any=[];
  prof:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authAf: AngularFireAuth,
              public afs: AngularFirestore,
              ) {
    this.advertisers=navParams.get('advertisers');
    // this.birthItems=navParams.get('birthItems');
  }

  ionViewDidLoad() {
    this.owner();
    this.products();
  }


  owner(){
    this.token = new BehaviorSubject<string>(this.authAf.auth.currentUser.uid);

    let hala = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<User>('advertisers', ref=> ref.where('userId', '==', token))
          .valueChanges()
        )
    );

    hala.subscribe(advertisers=>{
      this.advertisers = advertisers
      console.log(this.advertisers);
    })
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

  updateProfile(asd){
    this.navCtrl.push(UpdateProfilePage, {
      advertisers: this.advertisers,
      products: this.myProducts,
    })
  }





}
