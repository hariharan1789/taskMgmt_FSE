import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task';

import { TaskService } from '../addtask/services/task.service';
import { Project } from '../../models/project';


@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  SortKey: string;
  Tasks: Task[];
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private taskService: TaskService

  ) {}








  onProjectSelected(project: Project) {
    this.project = project;
    this.refreshList();
  }
  refreshList() {
    // fetch all tasks associated to this project and display
    this.taskService
      .getTasksList(this.project.Project_ID, this.SortKey)
      .subscribe(response => {
        if (response.Success === true) {
          if (response.Data.length === 0) {
            this.alertService.warn(
              'Task not available:' + this.project.Project,
              'Warning',
              3000
            );
          }

          this.Tasks = response.Data;
          console.log(this.Tasks);
        } else {
          this.alertService.error(
            'Unable to fetch project due to some error:' +
              this.project.Project,
            'Error',
            3000
          );
        }
      });
  }

  ngOnInit() {}

  endTask(taskId: number) {
    this.taskService.endTask(taskId).subscribe(response => {
      if (response.Success === true) {
        this.refreshList();
        this.alertService.success('Completed Task!!!', 'Success', 2000);
      } else {
        this.alertService.error(response.Message, 'Invalid response', 2000);
      }
    });
  }
  sortTask(sortKey: string) {
    this.SortKey = sortKey;
    this.taskService
      .getTasksList(this.project.Project_ID, sortKey)
      .subscribe(response => {
        if (response.Success === true) {
          this.Tasks = response.Data;
        } else {
          this.alertService.error(response.Message, 'Invalid response', 3000);
        }
      });
  }

  editTask(taskId: number) {
    this.taskService.getTask(taskId).subscribe(response => {
      if (response.Success === true) {
        this.router.navigate(['/task'], {
          queryParams: { taskId: taskId }
        });
      } else {
        this.alertService.error(response.Message, 'Invalid response', 3000);
      }
    });
  }
}
