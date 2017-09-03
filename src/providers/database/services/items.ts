import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Item } from '../database-providers';

@Injectable()
export class ItemService {
  private basePath: string = '/items';
  items: FirebaseListObservable<Item[]> = null; //  list of objects
  item: FirebaseObjectObservable<Item> = null; //   single object

  constructor(private db: AngularFireDatabase) { }
              
    getList(query={}): FirebaseListObservable<Item[]> {
      this.items = this.db.list(this.basePath, { query: query });
      return this.items
    }

    get(key: string): FirebaseObjectObservable<Item> {
      const itemPath =  `${this.basePath}/${key}`;
      this.item = this.db.object(itemPath)
      return this.item
    }

    create(item: Item): void  {
      this.items.push(item)
        .catch(error => this.handleError(error))
    }

    update(key: string, value: any): void {
      this.items.update(key, value)
        .catch(error => this.handleError(error))
    }

    delete(key: string): void {
        this.items.remove(key)
          .catch(error => this.handleError(error))
    }

    deleteAll(): void {
        this.items.remove()
          .catch(error => this.handleError(error))
    }

    private handleError(error) {
      console.log(error)
    }
}