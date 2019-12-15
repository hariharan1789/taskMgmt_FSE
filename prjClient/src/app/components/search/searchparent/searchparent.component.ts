import { ParentTask } from '../../../models/task';

import { ParentTaskService } from '../../addtask/services/parent-task.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

declare var $: any;
declare var jquery: any;


@Component({
  selector: 'app-searchparent',
  templateUrl: './searchparent.component.html',
  styleUrls: ['./searchparent.component.css']
})
export class SearchparentComponent implements OnInit {
  @Output() parentSelected = new EventEmitter<ParentTask>();
  @Input() name: string;


  enableAdd: boolean;
  SelectedParentID: number;
  ParentTasks: ParentTask[];
  SearchKey: string;


  constructor(private parentService: ParentTaskService) {}

  addParent() {
    this.parentService
      .getParentTask(this.SelectedParentID)
      .subscribe(response => {
        if (response.Success === true) {
          this.parentSelected.emit(response.Data);
          $('#parentSearchModel').modal('toggle');
        }
      });
  }


  selectParent(parentID: number) {
    this.SelectedParentID = parentID;
    this.enableAdd = true;
  }
  searchParent(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }
  refreshList() {
    this.parentService.getParentTaskList(this.SearchKey).subscribe(response => {
      if (response.Success === true) {
        this.ParentTasks = response.Data;
      }
    });

    this.enableAdd = false;
  }
  ngOnInit() {
    this.refreshList();
  }



}
