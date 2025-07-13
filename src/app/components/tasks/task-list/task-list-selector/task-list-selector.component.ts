import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskSelectParameters, TaskStatus } from '../../../../models/task.model';
import { SharedModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../redux/store';
import { loadTaskList } from '../../../../redux/tasks/task.actions';

@Component({
  selector: 'app-task-list-selector',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-list-selector.component.html',
  styleUrl: './task-list-selector.component.css'
})
export class TaskListSelectorComponent implements OnInit {
  selectForm!: FormGroup;
  taskStatus = TaskStatus;
  @Input() selectParameters: TaskSelectParameters | undefined;
  @Output() close = new EventEmitter();
  @Output() onSelect = new EventEmitter<TaskSelectParameters>();
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectForm = new FormGroup({
      search: new FormControl<string>(this.selectParameters ? this.selectParameters.search : ''),
      statuses: new FormControl(this.selectParameters ? this.selectParameters.statuses : [])
    });
  }

  select() {
    if (this.selectForm.valid){
      this.selectParameters = {
        search: this.selectForm.value.search,
        statuses: this.selectForm.value.statuses
      }

      this.onSelect.emit(this.selectParameters);
      this.close.emit();
    }
  }

  resetSelector() {
    this.store.dispatch(loadTaskList({selectParameters: undefined}))
    this.close.emit();
  }

  closeSelector() {
    this.close.emit();
  }
}
