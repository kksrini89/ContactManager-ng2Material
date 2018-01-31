import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/user';

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  }

  constructor(private httpClient: HttpClient) {
    this.dataStore = {users: []};
    this._users = new BehaviorSubject<User[]>([]);
  }

  get Users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolve(user);
    });
  }

  getUserById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
  }

  loadAll() {
    const url = 'https://angular-material-api.azurewebsites.net/users';
    return this.httpClient.get<User[]>(url)
    .subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
     }, error => console.log('failed to fetching users'));
  }

}
