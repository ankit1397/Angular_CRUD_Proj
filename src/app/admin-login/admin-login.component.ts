import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginError = '';
  admin: any;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin = this.adminService.getAdmin();
  }

  login(form: { value: any; }) {
    if (form.value.username === this.admin.username && form.value.password === this.admin.password) {
      this.router.navigate(['user-mgnmt']);
    }
    else {
      this.loginError = 'Wrong credentials! Please try again.';
    }
  }

}
