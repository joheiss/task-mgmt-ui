import {NgModule} from '@angular/core';
import {TasksRoutingModule} from './tasks-routing.module';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {TaskCardComponent} from './task-card/task-card.component';
import {TasksComponent} from './tasks/tasks.component';
import {SharedModule} from '../shared/shared.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksToolbarComponent } from './tasks-toolbar/tasks-toolbar.component';

@NgModule({
    declarations: [TasksComponent, TasksListComponent, TaskDetailsComponent, TaskCardComponent, TasksListComponent, TasksToolbarComponent],
    imports: [
        SharedModule,
        TasksRoutingModule
    ]
})
export class TasksModule {
}
