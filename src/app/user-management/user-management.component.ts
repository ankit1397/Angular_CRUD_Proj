import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { v4 as uuid } from 'uuid';
import { faPen, faTrashAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any;
  actions: any;
  newName = "";
  newEmail = "";
  newPassword = "";
  closeResult = "";
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faFileAlt = faFileAlt;
  dltPopupMsg = "";

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.actions = this.userService.getActionHistory();
  }

  addUser(user: { value: any; }) {
    if (user.value.name && user.value.email && user.value.password) {
      let newUser = {
        id: uuid(),
        editable: false,
        name: user.value.name,
        email: user.value.email,
        password: user.value.password,

      }
      this.userService.addUser(newUser);
      this.users = this.userService.getUsers();
      this.actions = this.userService.getActionHistory();
    }
    else {
      console.log("No user details filled to add..");
    }
  }

  editUser(user: any) {
    this.newName = "";
    this.newEmail = "";
    this.newPassword = "";
    user.editable = true;
  }

  saveUser(oldUser: any) {
    let newUser = {
      id: oldUser.id,
      editable: false,
      name: this.newName,
      email: this.newEmail,
      password: this.newPassword,

    }
    this.userService.updateUser(oldUser, newUser);
    this.users = this.userService.getUsers();
    this.actions = this.userService.getActionHistory();
    oldUser.editable = false;
  }

  deleteUser(content: any, userToBeDltd: any) {
    this.dltPopupMsg = 'Are you sure you want delete user '+userToBeDltd.name+' ?';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.userService.deleteUser(userToBeDltd);
         this.users = this.userService.getUsers();
        this.actions = this.userService.getActionHistory();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  
  }


}
