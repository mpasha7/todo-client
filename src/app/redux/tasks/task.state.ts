import { TaskDetailsVm, TaskLookupDto, TaskSelectParameters } from "../../models/task.model";


export interface TasksState {
    taskList: TaskLookupDto[];
    selectedTask: TaskDetailsVm | undefined;
    selectParameters: TaskSelectParameters | undefined;
    error: any;
}

export const initialTasksState: TasksState = {
    taskList: [],
    selectedTask: undefined,
    selectParameters: undefined,
    error: null
}