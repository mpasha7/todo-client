import { createAction, props } from "@ngrx/store";
import { CreateTaskDto, TaskDetailsVm, TaskListVm, TaskSelectParameters, UpdateTaskDto } from "../../models/task.model";


export enum ETaskActions {
    GetTaskList = "[Task] Get Task List",
    GetTaskListSuccess = "[Task] Get Task List Success",
    GetTaskListFailure = "[Task] Get Task List Failure",
    GetTask = "[Task] Get Task",
    GetTaskSuccess = "[Task] Get Task Success",
    GetTaskFailure = "[Task] Get Task Failure",
    CreateTask = "[Task] Create Task",
    UpdateTask = "[Task] Update Task",
    DeleteTask = "[Task] Delete Task"
}

export const loadTaskList = createAction(
    ETaskActions.GetTaskList,
    props<{selectParameters: TaskSelectParameters|undefined}>()
);
export const loadTaskListSuccess = createAction(
    ETaskActions.GetTaskListSuccess,
    props<{taskList: TaskListVm}>()
);
export const loadTaskListFailure = createAction(
    ETaskActions.GetTaskListFailure,
    props<{errorObject: any}>()
);

export const loadTask = createAction(
    ETaskActions.GetTask,
    props<{taskId: number}>()
);
export const loadTaskSuccess = createAction(
    ETaskActions.GetTaskSuccess,
    props<{task: TaskDetailsVm|undefined}>()
);
export const loadTaskFailure = createAction(
    ETaskActions.GetTaskFailure,
    props<{errorObject: any}>()
);

export const createTask = createAction(
    ETaskActions.CreateTask,
    props<{createTaskDto: CreateTaskDto}>()
);

export const updateTask = createAction(
    ETaskActions.UpdateTask,
    props<{updateTaskDto: UpdateTaskDto}>()
);

export const deleteTask = createAction(
    ETaskActions.DeleteTask,
    props<{taskId: number}>()
);