import {Injectable} from '@angular/core';
import {Task, TaskFilter} from '../task.model';
import {initialState, TasksState} from './tasks.state';
import {ObservableStore} from '@codewithdan/observable-store';
import {TasksService} from '../tasks.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TasksStore extends ObservableStore<TasksState> {

    constructor(private readonly tasksService: TasksService) {
        super({
            trackStateHistory: !environment.production,
            logStateChanges: !environment.production
        });
        this.setState(initialState);
    }

    clear(): void {
        this.setState(initialState);
    }

    getAll(): Observable<Task[]> {
        const state = this.getState();
        if (state && state.allTasks) {
            return of(state.allTasks);
        } else {
            return this.fetchAllTasks();
        }
    }

    getFilters(): Observable<TaskFilter> {
        const state = this.getState();
        return of(state.filters);
    }

    getOne(id: number): Observable<Task> {
        return this.getAll()
            .pipe(
                map(tasks => tasks.find(t => t.id === id)),
                catchError(this.handleError)
            );
    }

    add(task: Task): Observable<Task[]> {
        return this.tasksService.create(task)
            .pipe(
                switchMap(() => this.fetchAllTasks()),
                catchError(this.handleError)
            );
    }

    update(task: Task): Observable<Task[]> {
        return this.tasksService.update(task)
            .pipe(
                switchMap(() => this.fetchAllTasks()),
                catchError(this.handleError)
            );
    }

    updateStatus(task: Task): Observable<Task[]> {
        return this.tasksService.updateStatus(task)
            .pipe(
                switchMap(() => this.fetchAllTasks()),
                catchError(this.handleError)
            );
    }

    updateFilters(filters: TaskFilter): Observable<Task[]> {
        this.setState({filters}, 'update_filters');
        return this.fetchAllTasks();
    }

    delete(task: Task): Observable<Task[]> {
        return this.tasksService.delete(task)
            .pipe(
                switchMap(() => this.fetchAllTasks()),
                catchError(this.handleError)
            );
    }

    private fetchAllTasks(): Observable<Task[]> {
        const filters = this.getState().filters;
        return this.tasksService.getAll(filters)
            .pipe(
                map(tasks => {
                    this.setState({allTasks: tasks, loaded: true}, 'get_all_tasks');
                    return tasks;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(err: any) {
        console.error('Server error: ', err);
        this.setState({error: err, loaded: false}, 'handle_error');
        if (err.error instanceof Error) {
            return throwError(err.error.message);
        }
        return throwError(err || 'Server error');
    }
}

