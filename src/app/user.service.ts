import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    //localStorage.clear();
  }

  getUsers() {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    return users;
  }

  getActionHistory() {
    let actions = JSON.parse(localStorage.getItem('actions') || '{}');
    return actions;
  }

  addUser(newUser: { id: string; name: any; email: any; password: any; }) {

    if (localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users') || '[{}]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    else {
      let users: any = [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    //Action History
    if (localStorage.getItem('actions')) {
      let actions = JSON.parse(localStorage.getItem('actions') || '{}');
      let newAction = {
        desc: `Added User with name ${newUser.name} and email ${newUser.email}`,
        timestamp: new Date(),
      }
      actions.push(newAction);
      localStorage.setItem('actions', JSON.stringify(actions));

    }
    else {
      let actions: any[] = [];
      let newAction = {
        desc: `Added User with name ${newUser.name} and email ${newUser.email}`,
        timestamp: new Date(),
      }
      actions.push(newAction);
      localStorage.setItem('actions', JSON.stringify(actions));

    }
  }

  updateUser(oldUser: any, newUser: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[{}]');
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == oldUser.id) {
        users[i] = newUser;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
    //Action History
    let actions = JSON.parse(localStorage.getItem('actions') || '{}');
    let newAction = {
      desc: `Edited User with name ${oldUser.name} and email ${oldUser.email}`,
      timestamp: new Date(),
    }
    actions.push(newAction);
    localStorage.setItem('actions', JSON.stringify(actions));
  }

  deleteUser(userToBeDltd: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[{}]');
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == userToBeDltd.id) {
        users.splice(i, 1);
        //Action History
        let actions = JSON.parse(localStorage.getItem('actions') || '{}');
        let newAction = {
          desc: `Deleted User with name ${userToBeDltd.name} and email ${userToBeDltd.email}`,
          timestamp: new Date(),
        }
        actions.push(newAction);
        localStorage.setItem('actions', JSON.stringify(actions));
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  }
}
