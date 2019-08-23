import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Task, TaskFilter} from '../task.model';
import {AuthService} from '../../auth/auth.service';
import {TasksStore} from '../store/tasks.store';
import {SubSink} from 'subsink';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit, OnDestroy {
    tasks: Task[];
    filters: TaskFilter;

    private subs = new SubSink();

    constructor(private readonly router: Router,
                private readonly store: TasksStore,
                private readonly authService: AuthService,
    ) {
    }

    ngOnInit() {
        if (!this.authService.isTokenValid()) {
            return this.router.navigateByUrl('auth/signin');
        }
        this.subs.sink = this.store.stateChanged.subscribe(state => {
            if (state.loaded) {
                this.tasks = [...state.allTasks];
                this.filters = {...state.filters};
            }
        });
        this.subs.sink = this.store.getAll()
            .subscribe(tasks => this.tasks = [...tasks]);
        this.subs.sink = this.store.getFilters()
            .subscribe(filters => this.filters = {...filters});
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
