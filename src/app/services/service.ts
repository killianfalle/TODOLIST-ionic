import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Item } from '../models/item';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable()
export class Service {

  itemsCollection: AngularFirestoreCollection<Item>;
  advertisersCollection: AngularFirestoreCollection<User>;
  itemDoc: AngularFirestoreDocument<Item>;
  advertiserDoc: AngularFirestoreDocument<User>;
  birthItems: Observable<Item[]>;
  christItems: Observable<Item[]>;
  wedItems: Observable<Item[]>;

  advertisers: Observable<User[]>;
  user: Observable<User>;
  // token: BehaviorSubject<string>;
  // wedItems: Observable<Item[]>;
  // christItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore, public authAf: AngularFireAuth,) {
    // this.token = new BehaviorSubject<string>('VZPn0pL3TpUuHsjUUGy7hnayv3o2');
    this.itemsCollection = this.afs.collection('birthItems');
    this.advertisersCollection = this.afs.collection('advertisers');
    
    // this.itemsCollection = this.afs.collection('christItems');
    // this.itemsCollection = this.afs.collection('wedItems');

    // this.user = this.authAf.authState
    //   .switchMap(user => {
    //     if(user){
    //       return this.afs.doc<User>('advertisers/${user.uid}').valueChanges()
    //     }else{
    //       return Observable.of(null)
    //     }
    //   })

    // this.birthItems = this.token.pipe(
    //   switchMap(token => 
    //     this.afs
    //       .collection<Item>('birthItems', ref=> ref.where('userId', '==', token))
    //       .valueChanges()
    //     )
    // );

    //   this.christItems = this.itemsCollection.snapshotChanges()
  //     .map(actions=>{
  //       return actions.map(a=>{
  //         const data=a.payload.doc.data() as Item;
  //         data.id = a.payload.doc.id;
  //         return data;
  //       });
  //   });
      

  //   this.christItems = this.itemsCollection.snapshotChanges()
  //     .map(actions=>{
  //       return actions.map(a=>{
  //         const data=a.payload.doc.data() as Item;
  //         data.id = a.payload.doc.id;
  //         return data;
  //       });
  //   });

  //   this.wedItems = this.itemsCollection.snapshotChanges()
  //     .map(actions=>{
  //       return actions.map(a=>{
  //         const data=a.payload.doc.data() as Item;
  //         data.id = a.payload.doc.id;
  //         return data;
  //       });
  //   });
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider){
    return this.authAf.auth.signInWithPopup(provider)
      .then((credential)=>{
        this.updateUserData(credential.user);
      })
  }
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`advertisers/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(data);
  }

  updateItem(item: Item){
    if(item.collectionName == 'birthItems'){
      this.itemDoc = this.afs.doc(`birthItems/` + item.id);
      this.itemDoc.update(item)
      return false;
    }else if(item.collectionName == 'christItems'){
      this.itemDoc = this.afs.doc(`christItems/` + item.id);
      this.itemDoc.update(item)
      return false;
    }else if(item.collectionName == 'wedItems'){
      this.itemDoc = this.afs.doc(`wedItems/` + item.id);
      this.itemDoc.update(item)
      return false;
    }
  }

  updateAdvertiser(advertiser: User){
    this.itemDoc = this.afs.doc(`advertisers/` + advertiser.userId);
    this.itemDoc.update(advertiser)
  }

  addItem(item:Item){
    this.itemsCollection.add(item);
  }

  forgotPasswordUser(email: any){
    return this.authAf.auth.sendPasswordResetEmail(email);
  }

  getAdvertisers(){
    return this.afs.collection('advertisers').valueChanges();
  }

  getBirthItems(){
    return this.afs.collection('birthItems').valueChanges();
  }

  getProducts(){
    return this.birthItems
  }

  getChristItems(){
    return this.afs.collection('christItems').valueChanges();
  }

  getWedItems(){
    return this.afs.collection('wedItems').valueChanges();
  }
}


