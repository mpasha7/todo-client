import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState } from "./task.state";


export const selectTaskState = createFeatureSelector<TasksState>('tasksStore');

export const selectTaskList = createSelector(
    selectTaskState,
    (state: TasksState) => state.taskList
);

export const selectTask = createSelector(
    selectTaskState,
    (state: TasksState) => state.selectedTask
);

export const selectTaskError = createSelector(
    selectTaskState,
    (state: TasksState) => state.error
);

export const selectTaskSelectParameters = createSelector(
    selectTaskState,
    (state: TasksState) => state.selectParameters
);
