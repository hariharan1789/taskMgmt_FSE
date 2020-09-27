import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ParentTaskService } from './services/parent-task.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


import { User } from '../../models/user';
import { TaskService } from './services/task.service';
import * as moment from 'moment';
import { Task, ParentTask } from '../../models/task';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare var jquery: any;


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  today = new Date();
  task = <Task>{
    Task: '',
    Priority: 0,
    Start_Date: moment(new Date(this.today)).format('YYYY-MM-DD'),
    End_Date: moment(new Date(this.today)).format('YYYY-MM-DD')
  };
  taskId: any = null;

  taskStartDate = moment(new Date(this.today)).format('YYYY-MM-DD');
  taskEndDate = moment(new Date(this.today)).format('YYYY-MM-DD');



  isParentTask: false;

  constructor(
    private parentTaskService: ParentTaskService,
    private taskService: TaskService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // callback from Parent Task search popup
  onParentSelected(parent: ParentTask) {
    this.task.Parent = parent;
  }

  reset() {
    this.taskStartDate = moment(this.today.toString()).format('YYYY-MM-DD');
    this.taskEndDate = moment(this.today.toString()).format('YYYY-MM-DD');

    this.task = <Task>{
      Task: null,
      Priority: 0,
      Start_Date: this.taskStartDate,
      End_Date: Date()
    };

    this.isParentTask = false;
    this.taskId = null;
  }


  updateTask() {
    this.task.Start_Date = this.taskStartDate.toString();
    this.task.End_Date = this.taskEndDate.toString();

    this.taskService.editTask(this.task).subscribe(response => {
      if (response.Success === true) {
        this.alertService.success('Task Updated successfuly!', 'Success', 3000);
        this.reset();
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }
  ngOnInit() {
    // set taskId that is sent from Edit Task
    this.route.queryParams.subscribe(params => {
      this.taskId = params['taskId'];
    });

    if (this.taskId) {
      // load the task for update
      this.taskService.getTask(this.taskId).subscribe(response => {
        this.task = response.Data;

        const startDateSource = moment(
          this.task.Start_Date
        ).toDate();
        this.taskStartDate = moment(new Date(startDateSource))
        .format('YYYY-MM-DD');

        const endDateSource = moment(this.task.End_Date).toDate();
        this.taskEndDate = moment(new Date(endDateSource))
        .format('YYYY-MM-DD');
      });
    }
  }
  // callback from Project search popup
  onProjectSelected(project: Project) {
    this.task.Project = project;
  }


  onUserSelected(user: User) {
    this.task.User = user;
  }


  addTask() {
    if (this.isParentTask) {
      // create parent task
      const newParent = <ParentTask>{
        Parent_Task: this.task.Task,
        Project_ID: this.task.Project.Project_ID
      };

      this.parentTaskService.addParentTask(newParent).subscribe(response => {
        if (response.Success === true) {
          this.alertService.success(
            'Parent Task Added successfully!',
            'SUCCESS',
            3000
          );
          this.reset();
        } else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
    } else {
      this.task.Start_Date = this.taskStartDate.toString();
      this.task.End_Date = this.taskEndDate.toString();

      // create individual task with or without linked to parent task
      this.taskService.addTask(this.task).subscribe(response => {
        if (response.Success === true) {
          this.alertService.success(
            'New Task Added Successfuly!',
            'SUCCESS',
            3000
          );
        //  this.reset();
        } else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
    }
  }

}
