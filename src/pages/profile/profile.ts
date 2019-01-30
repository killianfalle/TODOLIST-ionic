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
  birthItems: any;
  christItems: any;
  wedItems: any;
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

    let hala = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<Item>('birthItems', ref=> ref.where('userIDs', 'array-contains', token))
          .valueChanges()
        )
    );

    let hala2 = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<Item>('christItems', ref=> ref.where('userIDs', 'array-contains', token))
          .valueChanges()
        )
    );

    let hala3 = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<Item>('wedItems', ref=> ref.where('userIDs', 'array-contains', token))
          .valueChanges()
        )
    );

    hala.subscribe(birthItems=>{
      this.birthItems = birthItems
      console.log(this.birthItems);

      //TO DELETE THOSE ITEMS THAT ARE NOT INCLUDED BY THE ADVERTISER'S BUSINESS
      for(var i=0; i<this.birthItems.length; i++){
        var element = this.birthItems[i].itemList.itemName;
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

    hala2.subscribe(christItems=>{
      this.christItems = christItems
      console.log(this.christItems);

      //TO DELETE THOSE ITEMS THAT ARE NOT INCLUDED BY THE ADVERTISER'S BUSINESS
      for(var i=0; i<this.christItems.length; i++){
        var element = this.christItems[i].itemList.itemName;
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

    hala3.subscribe(wedItems=>{
      this.wedItems = wedItems
      console.log(this.wedItems);

      //TO DELETE THOSE ITEMS THAT ARE NOT INCLUDED BY THE ADVERTISER'S BUSINESS
      for(var i=0; i<this.wedItems.length; i++){
        var element = this.wedItems[i].itemList.itemName;
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
