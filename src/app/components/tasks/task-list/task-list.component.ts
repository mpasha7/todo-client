import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { TaskLookupDto, TaskSelectParameters, TaskStatus } from '../../../models/task.model';
import { deleteTask, loadTaskList } from '../../../redux/tasks/task.actions';
import { selectTaskError, selectTaskList, selectTaskSelectParameters } from '../../../redux/tasks/task.selector';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../forms/task-form/task-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TaskListSelectorComponent } from "./task-list-selector/task-list-selector.component";
import { ErrorObject } from '../../../models/error.model';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SharedModule, TaskListSelectorComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  taskList!: TaskLookupDto[];
  errorObject!: ErrorObject;
  taskStatus = TaskStatus;
  selectorIsOpen = false;
  selectParameters: TaskSelectParameters|undefined = undefined;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.select(selectTaskSelectParameters).subscribe((data) => {
      this.selectParameters = data;
    });
    this.store.dispatch(loadTaskList({selectParameters: this.selectParameters}));
    this.store.select(selectTaskList).subscribe((data) => {
      this.taskList = data;
    });
    this.store.select(selectTaskError).subscribe((data) => {
      this.errorObject = data;
    });
  }

  onDeleteTask(id: number) {
    if (confirm("Вы хотите удалить эту задачу?")) {
      this.store.dispatch(deleteTask({taskId: id}));
      this.store.select(selectTaskError).subscribe((data) => {
      this.errorObject = data;
    });
    }
  }

  toTaskForm(id: number) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    const gialogRef = this.dialog.open(
      TaskFormComponent,
      {
        width: '50%',
        data: {
          taskId: id
        }
      }
    );
  }

  onTasksSelect(params: TaskSelectParameters) {
    this.store.dispatch(loadTaskList({selectParameters: params}));
  }
}
