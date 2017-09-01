import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../models/item';

@Injectable()
export class Items {

  constructor(public database: AngularFireDatabase) {
  }

  query(params?: any) {
    return this.database.list('/items', params)
      .map(resp => resp.json());
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
