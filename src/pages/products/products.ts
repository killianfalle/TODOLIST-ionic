import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/services/service';
import { ItemDetailsPage } from '../item-details/item-details';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  birthItems:any;
  isSearchbarOpened = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public itemService: Service) {

    this.itemService.getBirthItems().subscribe(birthItems => {
      this.birthItems = birthItems;
      console.log(this.birthItems);
    });
  }

  imgDetail(item){
    this.navCtrl.push(ItemDetailsPage,{
      data: item.name,
      itemDetail: item.itemDetails
    });
  }

  edit(event, item){
    this.navCtrl.push(EditPage, {
      item: this.birthItems,
      birthItems: this.birthItems
    })
  }
  
}
