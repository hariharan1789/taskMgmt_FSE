import { Task } from '../models/task';

export interface Project {
  Manager_ID?: number;
  Project_ID?: number;
  Tasks?: Task[];
  Project: string;

  End_Date?: Date;
  Priority: number;
  Start_Date?: Date;


}
