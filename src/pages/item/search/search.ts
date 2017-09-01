import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../../item/item-detail/item-detail';

import { Item } from '../../../models/database/item';

import { FirebaseListObservable } from 'angularfire2/database';
import { ItemService } from '../../../providers/database-providers';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  public items: FirebaseListObservable<Item[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.items = this.itemService.getList({
        orderByChild: 'name',
        startAt: val        
      });
        return;
    }
    this.items = this.itemService.getList({
      orderByChild: 'name',
      startAt: val        
  });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
