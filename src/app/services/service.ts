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

@Injectable()
export class Service {

  itemsCollection: AngularFirestoreCollection<Item>;
  itemDoc: AngularFirestoreDocument<Item>;
  birthItems: Observable<Item[]>;
  christItems: Observable<Item[]>;
  wedItems: Observable<Item[]>;

  user: Observable<User>;
  token: BehaviorSubject<string>;
  tok: BehaviorSubject<string>;
  // wedItems: Observable<Item[]>;
  // christItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore, public authAf: AngularFireAuth,) {
    this.token = new BehaviorSubject<string>('VZPn0pL3TpUuHsjUUGy7hnayv3o2');
    this.itemsCollection = this.afs.collection('birthItems');
    // this.itemsCollection = this.afs.collection('christItems');
    // this.itemsCollection = this.afs.collection('wedItems');

    this.birthItems = this.token.pipe(
      switchMap(token => 
        this.afs
          .collection<Item>('birthItems', ref=> ref.where('userId', '==', token))
          .valueChanges()
        )
    );

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

  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`birthItems/` + item.id);
    this.itemDoc.update(item)
  }

  addItem(item:Item){
    this.itemsCollection.add(item);
  }

  forgotPasswordUser(email: any){
    return this.authAf.auth.sendPasswordResetEmail(email);
  }

  getBirthItems(){
    return this.birthItems;
    // return this.afs.collection('birthItems/').doc(this.token).valueChanges()
  }
  

  getChristItems(): Observable<Item[]>{
    return this.afs.collection('christItems').valueChanges();
  }

  getWedItems(): Observable<Item[]>{
    return this.afs.collection('wedItems').valueChanges();
  }
}


