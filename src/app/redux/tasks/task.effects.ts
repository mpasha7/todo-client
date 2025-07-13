import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../../services/tasks.service";
import { createTask, deleteTask, loadTask, loadTaskFailure, loadTaskList, loadTaskListFailure, loadTaskListSuccess, loadTaskSuccess, updateTask } from "./task.actions";
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store";
import { selectTaskSelectParameters } from "./task.selector";
import { ErrorObject } from "../../models/error.model";


@Injectable()
export class TaskEffects {
    _loadTaskList$;
    _loadTask$;
    _createTask$;
    _updateTask$;
    _deleteTask$;
    anyErrorObject: ErrorObject = { message: "Что-то пошло не так" };

    constructor(
        private action$: Actions,
        private service: TasksService,
        private store: Store<AppState>,
    ) {
        this._loadTaskList$ = createEffect(() => action$.pipe(
            ofType(loadTaskList),
            mergeMap(({selectParameters}) => this.service.getTaskList(selectParameters).pipe(
                map((data) => loadTaskListSuccess({taskList: data})),
                catchError((error) => of(loadTaskListFailure({errorObject: error})))
            ))
        ));

        this._loadTask$ = createEffect(() => action$.pipe(
            ofType(loadTask),
            mergeMap(({taskId}) => this.service.getTask(taskId).pipe(
                switchMap((data) => of(data
                    ? loadTaskSuccess({task: data})
                    : loadTaskListFailure({errorObject: this.anyErrorObject})
                )),
                catchError((error) => of(loadTaskFailure({errorObject: error})))
            ))
        ));

        this._createTask$ = createEffect(() => action$.pipe(
            ofType(createTask),
            withLatestFrom(this.store.select(selectTaskSelectParameters)),
            mergeMap(([{createTaskDto}, selectParams]) => this.service.createTask(createTaskDto).pipe(
                switchMap((data) => of(data > 0
                    ? loadTaskList({selectParameters: selectParams})
                    : loadTaskListFailure({errorObject: this.anyErrorObject})
                )),
                catchError((error) => of(loadTaskListFailure({errorObject: error})))
            ))
        ));

        this._updateTask$ = createEffect(() => action$.pipe(
            ofType(updateTask),
            withLatestFrom(this.store.select(selectTaskSelectParameters)),
            mergeMap(([{updateTaskDto}, selectParams]) => this.service.updateTask(updateTaskDto).pipe(
                mergeMap((data) => data
                    ? of(loadTaskList({selectParameters: selectParams}),
                         loadTask({taskId: updateTaskDto.id}))
                    : of(loadTaskListFailure({errorObject: this.anyErrorObject}))
                ),
                catchError((error) => of(loadTaskListFailure({errorObject: error})))
            ))
        ));

        this._deleteTask$ = createEffect(() => action$.pipe(
            ofType(deleteTask),
            withLatestFrom(this.store.select(selectTaskSelectParameters)),
            mergeMap(([{taskId}, selectParams]) => this.service.deleteTask(taskId).pipe(
                switchMap((data) => of(data
                    ? loadTaskList({selectParameters: selectParams})
                    : loadTaskListFailure({errorObject: this.anyErrorObject})
                )),
                catchError((error) => of(loadTaskListFailure({errorObject: error})))
            ))
        ));
    }
}