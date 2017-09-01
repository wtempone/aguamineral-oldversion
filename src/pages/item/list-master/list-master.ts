import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { FirebaseListObservable } from 'angularfire2/database';
import { ItemService } from '../../../providers/database-providers';

import { Item } from '../../../models/database/item';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  public items: FirebaseListObservable<Item[]>;
  
  constructor(public navCtrl: NavController, public itemSvc: ItemService, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.items = this.itemSvc.getItemsList({limitToLast: 5})
  }

  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemSvc.createItem(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.itemSvc.deleteItem(item);
  }

  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
