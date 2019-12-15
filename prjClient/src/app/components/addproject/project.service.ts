import { Injectable } from '@angular/core';


import { Project } from '../../models/project';
import { ApiResponse } from '../apiresponse/models/apires';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    baseUri = environment.apiBaseUri;

    constructor(private http: HttpClient) { }

// functionality to add project to the server
    addProject(newProject: Project): Observable<ApiResponse<Project>> {

        const uri = `${this.baseUri}${environment.endpoint_project_add}`;

        return this.http
            .post<ApiResponse<Project>>(uri, newProject);
    }


// function to retrieve the list of stored projects  from server

    getProjects(searchKey: string, sortKey: string): Observable<ApiResponse<Project[]>> {

        // add query string params to search and sort
        let params = new HttpParams();

        if (searchKey) {
            params = params.append('searchKey', searchKey);
        }

        if (sortKey) {
            params = params.append('sortKey', sortKey);
        }

        const uri = `${this.baseUri}${environment.endpoint_project_get}`;

        return this.http
            .get<ApiResponse<Project[]>>(uri, { params: params });
    }

// function to delete project

    deleteProject(projectID: number): Observable<ApiResponse<Project>> {

        const uri = `${this.baseUri}${environment.endpoint_project_delete}/${projectID}`;

        return this.http
            .get<ApiResponse<Project>>(uri);
    }
// function to edit project
    editProject(updateProject: Project): Observable<ApiResponse<Project>> {

        const uri = `${this.baseUri}${environment.endpoint_project_edit}/${updateProject.Project_ID}`;

        return this.http
          .post<ApiResponse<Project>>(uri, updateProject);
      }
 // service to get project from server
    getProject(projectId: number): Observable<ApiResponse<Project>> {

        const uri = `${this.baseUri}${environment.endpoint_project_get}/${projectId}`;

        return this.http
            .get<ApiResponse<Project>>(uri);
    }



}
