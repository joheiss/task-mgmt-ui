import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Task} from '../task.model';
import {TasksStore} from '../store/tasks.store';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {

    @Input() tasks: Task[];

    constructor(private readonly store: TasksStore) {
    }

    onStatusChange(task: Task): void {
        this.store.updateStatus(task).pipe(take(1)).subscribe();
    }

    onDelete(task: Task): void {
        this.store.delete(task).pipe(take(1)).subscribe();
    }

}
