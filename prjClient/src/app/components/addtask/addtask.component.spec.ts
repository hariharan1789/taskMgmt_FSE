import { SearchparentComponent } from './../search/searchparent/searchparent.component';
import { AdduserComponent } from './../adduser/adduser.component';
import { AddtaskComponent } from './../addtask/addtask.component';
import { ViewtaskComponent } from './../viewtask/viewtask.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, from } from 'rxjs';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddprojectComponent } from '../addproject/addproject.component';
import { SearchuserComponent } from '../search/searchuser/searchuser.component';
import { UserService } from '../adduser/users.service';
import { ProjectService } from '../addproject/project.service';
import { AlertService } from '../services/alert.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { SearchprojectComponent } from '../search/searchproject/searchproject.component';
import { TaskService } from './services/task.service';

const routes: Routes = [
  { path: 'viewtask', component: ViewtaskComponent },
  { path: 'user', component: AdduserComponent },

  { path: 'project', component: AddprojectComponent },

  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'task', component: AddtaskComponent }

];

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdduserComponent,
        SearchuserComponent,
        ViewtaskComponent,
        AddprojectComponent,
        AddtaskComponent,
        SearchparentComponent,
          SearchprojectComponent

      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot({
          toastClass: 'toast toast-bootstrap-compatibility-fix'
        }),
        RouterModule.forRoot(routes)
      ],
      providers: [
        ProjectService,
        HttpClientModule,
        AlertService,
        UserService,
        TaskService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('add parent task service should be called',  () => {
    const servTask = fixture.debugElement.injector.get(TaskService);

    const varSpy = spyOn(servTask, 'addTask').and.callFake(() => {
      return from([]);
    });
    fixture.componentInstance.addTask();
    expect(varSpy).toHaveBeenCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the updateTask service', () => {
    const servTask = fixture.debugElement.injector.get(TaskService);

    const varSpy = spyOn(servTask, 'editTask').and.callFake(() => {
      return from([]);
    });
    fixture.componentInstance.updateTask();
    expect(varSpy).toHaveBeenCalled();
  });

  it('should call the addTask service', () => {
    const servTask = fixture.debugElement.injector.get(TaskService);
    const varSpy = spyOn(servTask, 'addTask').and.callFake(() => {
      return from([]);
    });
    fixture.componentInstance.addTask();
    expect(varSpy).toHaveBeenCalled();
  });
  it('should display title in header tag', async(() => {
    const output = fixture.debugElement.nativeElement;
    expect(output.querySelector('h3').textContent).toContain(
      'Add/Update Task:'
    );
  }));

});
