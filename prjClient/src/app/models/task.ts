import { User } from '../models/user';
import { Project } from '../models/project';

export interface Task {
    End_Date?: string;
    Project?: Project;

    Task: string;
    Start_Date?: string;

    Priority: number;
    User?: User;

    Parent?: ParentTask;
    Task_ID?: number;

}

export interface ParentTask {

    Project_ID?: number;
    Parent_ID?: number;
    Parent_Task: string;
}
