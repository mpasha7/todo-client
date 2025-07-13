import { Routes } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskDetailsComponent } from './components/tasks/task-details/task-details.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/:id', component: TaskDetailsComponent },
    { path: '404', component: NotFoundComponent },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
