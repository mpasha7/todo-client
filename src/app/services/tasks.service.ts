import { Injectable } from '@angular/core';
import { TaskDetailsVm, TaskListVm, CreateTaskDto, UpdateTaskDto, initialTasksDb, TaskSelectParameters } from '../models/task.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksDb!: TaskDetailsVm[];
  counter!: number;

  constructor() {
    this.tasksDb = initialTasksDb;
    this.counter = this.tasksDb.length;
  }

  getTaskList(params: TaskSelectParameters|undefined): Observable<TaskListVm> {
    let result: TaskListVm = {tasks: []};
    of({ tasks: this.tasksDb
      .filter(t => !params || (params && 
                   t.title.toLowerCase().includes(params.search.toLowerCase()) &&
                   (params.statuses.length == 0 || params.statuses.includes(t.status))))
      .map(t => { 
        return { id: t.id, title: t.title, status: t.status };
      }) 
    }).subscribe(res => {result = res});
    return of(result);
  }

  getTask(id: number): Observable<TaskDetailsVm|undefined> {
    const task = this.tasksDb.find(t => t.id == id);
    if (task) {
      return of(task);
    }
    else {
      return of(undefined);
    }
  }

  createTask(createTaskDto: CreateTaskDto): Observable<number> {
    const task: TaskDetailsVm = {
      id: ++this.counter,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status
    }
    this.tasksDb.push(task);
    return of(task.id);
  }

  updateTask(updateTaskDto: UpdateTaskDto): Observable<boolean> {
    const index = this.tasksDb.findIndex(t => t.id === updateTaskDto.id);
    if (index >= 0) {
      const task: TaskDetailsVm = {
        id: updateTaskDto.id,
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status
      }
      this.tasksDb.splice(index, 1, task);
      return of(true);
    }
    else {
      return of(false);
    }
  }

  deleteTask(id: number): Observable<boolean> {
    const index = this.tasksDb.findIndex(t => t.id === id);
    if (index >= 0) {
      this.tasksDb.splice(index, 1);
      return of(true);
    }
    else {
      return of(false);
    }
  }
}
