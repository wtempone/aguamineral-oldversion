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
    this.items = this.itemSvc.getList({limitToLast: 5})
  }

  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemSvc.create(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.itemSvc.delete(item);
  }

  openItem(itemDB: Item) {
    let addModal = this.modalCtrl.create(ItemCreatePage, { item: itemDB });
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemSvc.update(itemDB.$key, item);
      }
    })
    addModal.present();  
  }
}
