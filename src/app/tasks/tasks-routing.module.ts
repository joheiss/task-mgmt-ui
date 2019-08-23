import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
    {
        path: 'tasks',
        component: TasksComponent,
        children: [
            {path: 'create', component: TaskDetailsComponent},
            {path: 'edit', component: TaskDetailsComponent},
            {path: 'display', component: TaskDetailsComponent},
        ]
    }
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TasksRoutingModule {
}
