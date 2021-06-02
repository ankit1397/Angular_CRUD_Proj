import { Injectable } from '@angular/core';
import { Init } from './admin-credentials';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends Init {

  constructor() {
    //localStorage.clear();
    super();
    this.load();
  }

  getAdmin() {
    let admin = JSON.parse(localStorage.getItem('admin') || '{}');
    return admin;
  }
}
