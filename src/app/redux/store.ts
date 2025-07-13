import { TaskEffects } from "./tasks/task.effects";
import { tasksReducer } from "./tasks/task.reducer";
import { TasksState } from "./tasks/task.state";

export interface AppState {
    tasksState: TasksState;
}

export const appStore = {
    tasksStore: tasksReducer
}

export const appEffects = [
    TaskEffects
]
