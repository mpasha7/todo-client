import { createReducer, on } from "@ngrx/store";
import { initialTasksState } from "./task.state";
import { loadTaskList, loadTaskListFailure, loadTaskListSuccess, loadTask, loadTaskFailure, loadTaskSuccess } from "./task.actions";


export const tasksReducer = createReducer(
    initialTasksState,
    on(loadTaskList, (state, action) => {
        return {
            ...state,
            selectParameters: action.selectParameters,
            error: null
        }
    }),
    on(loadTaskListSuccess, (state, action) => {
        return {
            ...state,
            taskList: [...action.taskList.tasks]
        }
    }),
    on(loadTaskListFailure, (state, action) => {
        return {
            ...state,
            taskList: [],
            error: action.errorObject
        }
    }),
    on(loadTask, (state) => {
        return {
            ...state,
            error: null
        }
    }),
    on(loadTaskSuccess, (state, action) => {
        return {
            ...state,
            selectedTask: action.task
        }
    }),
    on(loadTaskFailure, (state, action) => {
        return {
            ...state,
            selectedTask: undefined,
            error: action.errorObject
        }
    })
);