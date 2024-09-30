import { Injectable, signal, WritableSignal } from '@angular/core';

// import custom interfaces and models
import { User } from '../../shared/definitions/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeUser: WritableSignal<User|undefined> = signal(undefined);

  constructor() {
    this.getUserFromLocalStorage();
  }

  setActiveUser(user: User) {
    this.activeUser.set(user);
  }

  getUserFromLocalStorage() {
    let credentials = localStorage.getItem('credentials');
    let user = (credentials)? JSON.parse(credentials) : undefined;
    this.setActiveUser(user);
  }
}
