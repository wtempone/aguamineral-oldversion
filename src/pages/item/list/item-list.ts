import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemDetailPage } from '../detail/item-detail';

import { FirebaseListObservable } from 'angularfire2/database';

import { Item } from '../../../providers/database/database-providers';
import { ItemService } from '../../../providers/database/database-providers';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListPage {
  public items: FirebaseListObservable<Item[]>;
  searchVisible: boolean = false;
  constructor(public navCtrl: NavController, public itemService: ItemService, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.items = this.itemService.getList({ limitToLast: 5 })
  }

  ionViewDidLoad() {
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
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

  addItem() {
    let addModal = this.modalCtrl.create(ItemDetailPage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemService.create(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.itemService.delete(item);
  }

  openItem(itemDB: Item) {
    let addModal = this.modalCtrl.create(ItemDetailPage, { item: itemDB });
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemService.update(itemDB.$key, item);
      }
    })
    addModal.present();
  }
}
