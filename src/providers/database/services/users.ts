import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { User } from '../database-providers';

@Injectable()
export class UserService {
  private basePath: string = '/users';
  public users: FirebaseListObservable<User[]> = null; //  list of objects
  public user: FirebaseObjectObservable<User> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  getList(query = {}): FirebaseListObservable<User[]> {
    this.users = this.db.list(this.basePath, { query: query });
    return this.users
  }

  get(key: string): FirebaseObjectObservable<User> {
    const itemPath = `${this.basePath}/${key}`;
    this.user = this.db.object(itemPath)
    return this.user
  }

  getOnce(field: string, value: string): FirebaseListObservable<User[]> {
    return this.db.list(this.basePath, { query: { orderByChild: field, equalTo: value } });
  }
  create(user: User): void {
    this.users.push(user)
      .then(success => { return user })
      .catch(error => this.handleError(error))
  }

  update(key: string, value: any): void {
    this.users.update(key, value)
      .catch(error => this.handleError(error))
  }

  delete(key: string): void {
    this.users.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.users.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}