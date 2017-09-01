import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemService } from '../../../providers/database-providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: ItemService) {
    this.item = navParams.get('item');
  }

}
