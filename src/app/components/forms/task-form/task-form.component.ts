import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { CreateTaskDto, TaskDetailsVm, TaskStatus, UpdateTaskDto } from '../../../models/task.model';
import { createTask, loadTask, updateTask } from '../../../redux/tasks/task.actions';
import { selectTask } from '../../../redux/tasks/task.selector';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  title!: string;
  taskId!: number;
  task: TaskDetailsVm|undefined = undefined;
  taskForm!: FormGroup;
  taskStatus = TaskStatus;

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {  }

  ngOnInit(): void {
    this.taskId = this.data.taskId

    if (this.taskId >= 0) {
      this.store.dispatch(loadTask({taskId: this.taskId}));
      this.store.select(selectTask).subscribe((data) => {
        this.task = data;
      });
      this.title = "Редактирование задачи";
    }
    else {
      this.title = "Новая задача";
    }

    this.taskForm = new FormGroup({
      title: new FormControl<string>(
        this.task ? this.task.title : '',
        [Validators.maxLength(100), Validators.required]
      ),
      description: new FormControl<string>(
        this.task && this.task.description ? this.task.description : '',
        Validators.maxLength(1000)
      ),
      status: new FormControl<string>(
        this.task ? this.task.status : ''
      )
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  saveTask() {
    if (this.taskForm.valid) {
      if (this.taskId >= 0) {
        const updateTaskDto: UpdateTaskDto = {
          id: this.taskId,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          status: this.taskForm.value.status as TaskStatus
        };
        this.store.dispatch(updateTask({updateTaskDto: updateTaskDto}));
      }
      else {
        const createTaskDto: CreateTaskDto = {
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          status: TaskStatus.NotCompleted
        };
        this.store.dispatch(createTask({createTaskDto: createTaskDto}));
      }
      this.closeDialog();
    }
  }
}
