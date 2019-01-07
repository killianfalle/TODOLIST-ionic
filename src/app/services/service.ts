import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
from 'angularfire2/firestore';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class Service {

  itemsCollection: AngularFirestoreCollection<Item>;
  itemDoc: AngularFirestoreDocument<Item>;
  birthItems: Observable<Item[]>;
  christItems: Observable<Item[]>;
  wedItems: Observable<Item[]>;
  users: object;
  // wedItems: Observable<Item[]>;
  // christItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('birthItems');
    // this.itemsCollection = this.afs.collection('christItems');
    // this.itemsCollection = this.afs.collection('wedItems');

    this.birthItems = this.itemsCollection.snapshotChanges()
      .map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
    });

    this.christItems = this.itemsCollection.snapshotChanges()
      .map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
    });

    this.wedItems = this.itemsCollection.snapshotChanges()
      .map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
    });
  }

  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`birthItems/` + item.id);
    this.itemDoc.update(item)
  }

  addItem(item:Item){
    this.itemsCollection.add(item);
  }

  getBirthItems(): Observable<Item[]>{
    return this.afs.collection('birthItems').valueChanges();
  }

  getChristItems(): Observable<Item[]>{
    return this.afs.collection('christItems').valueChanges();
  }

  getWedItems(): Observable<Item[]>{
    return this.afs.collection('wedItems').valueChanges();
  }
}


