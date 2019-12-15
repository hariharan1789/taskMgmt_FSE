import { Component, OnInit, Directive, EventEmitter, Input,
  Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from './users.service';
import { AlertService } from '../services/alert.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  SortKey: string;

  Users: User[];
  SearchKey: string;
  userForm: FormGroup;
  page = 1;
  pageSize = 2;
  collectionSize = 1;
  userAction: string;
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }






  editUser(userID) {
    this.userService.getUser(userID).subscribe(response => {
      if (response.Success === true) {
        this.userForm = this.formbuilder.group({
          firstName: [response.Data.First_Name, Validators.required],
          lastName: [response.Data.Last_Name, Validators.required],
          employeeId: [
            response.Data.Employee_ID,
            Validators.compose([
              Validators.required,
              Validators.pattern('^[0-9]{1,6}$')
            ])
          ],
          userId: response.Data.User_ID
        });

        this.userAction = 'Update';
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.collectionSize = 0;
    this.userService
      .getUsersList(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success === true) {
          this.Users = response.Data;
        }
      });
  }
  updateUser() {
    const updateUser = <User>{
      User_ID: this.userForm.controls['userId'].value,
      First_Name: this.userForm.controls['firstName'].value,
      Last_Name: this.userForm.controls['lastName'].value,
      Employee_ID: this.userForm.controls['employeeId'].value
    };

    this.userService.editUser(updateUser).subscribe(response => {
      console.log(response);
      if (response.Success === true) {
        this.alertService.success(
          'User updated successfully!',
          'Success',
          3000
        );

        this.refreshList();

        this.reset();
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }


  addorUpdateUser() {
    if (this.userAction === 'Add') {
      this.addUser();
    } else if (this.userAction === 'Update') {
      this.updateUser();
    }
  }
  createForm() {
    this.userForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,6}$')
        ])
      ],
      userId: ''
    });
    this.userAction = 'Add';
  }

  addUser() {
    const newUser = <User>{
      First_Name: this.userForm.controls['firstName'].value,
      Last_Name: this.userForm.controls['lastName'].value,
      Employee_ID: this.userForm.controls['employeeId'].value
    };

    this.userService.addUser(newUser).subscribe(response => {
      console.log(response);
      if (response.Success === true) {
        console.log('User added successfully!');
        this.alertService.success('User added successfully!', 'Success', 3000);

        this.refreshList();
        this.reset();
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }


  deleteUser(userID) {
    this.userService.deleteUser(userID).subscribe(response => {
      if (response.Success === true) {
        this.alertService.success(
          'User deleted successfully!',
          'Success',
          3000
        );
        this.refreshList();
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }

  reset() {
    this.userForm.reset();
    this.userAction = 'Add';
    this.SearchKey = null;
    this.SortKey = null;
  }

  search(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  sort(sortKey: string) {
    if (sortKey === 'firstName') {
      this.SortKey = 'First_Name';
    } else if (sortKey === 'lastName') {
      this.SortKey = 'Last_Name';
    } else if (sortKey === 'employeeId') {
      this.SortKey = 'Employee_ID';
    }
    console.log(this.SortKey);
    this.refreshList();
  }
}