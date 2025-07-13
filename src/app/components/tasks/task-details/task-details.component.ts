import { Component, OnInit } from '@angular/core';
import { TaskDetailsVm, TaskStatus } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { loadTask } from '../../../redux/tasks/task.actions';
import { selectTask, selectTaskError } from '../../../redux/tasks/task.selector';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TaskFormComponent } from '../../forms/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorObject } from '../../../models/error.model';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {
  taskId!: number;
  task!: TaskDetailsVm|undefined;
  errorObject!: ErrorObject;
  taskStatus = TaskStatus;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId = params['id'];
    });

    this.store.dispatch(loadTask({taskId: this.taskId}));
    this.store.select(selectTask).subscribe((data) => {
      this.task = data;
    });
    this.store.select(selectTaskError).subscribe((data) => {
      this.errorObject = data;
    });
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
}
