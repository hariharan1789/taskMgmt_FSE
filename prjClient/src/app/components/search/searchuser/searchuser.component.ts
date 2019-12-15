import { User } from '../../../models/user';

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { UserService } from '../../adduser/users.service';
import { FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {

  @Output() userSelected = new EventEmitter<User>();
  @Input() name: string;


  SearchKey: string;

  SortKey: string;
  Users: User[];

  enableSelect: boolean;
  SelectedUserID: number;
  constructor(private userService: UserService) {}
  addUser() {
    this.userService.getUser(this.SelectedUserID).subscribe(response => {
      if (response.Success === true) {
        this.userSelected.emit(response.Data);
        $('#userSearchModel').modal('toggle');
      }
    });
  }
  searchUser(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  ngOnInit() {
    this.refreshList();
  }



  selectUser(userID: number) {
    this.SelectedUserID = userID;
    this.enableSelect = true;
  }

  refreshList() {
    this.userService
      .getUsersList(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success === true) {
          this.Users = response.Data;
        }
      });
    this.enableSelect = false;
  }
}
