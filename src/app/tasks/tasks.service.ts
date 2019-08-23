import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, TaskFilter} from './task.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    private tasksUrl = `${environment.baseUrl}/tasks`;

    constructor(private http: HttpClient) {}

    getAll(criteria: TaskFilter = {}): Observable<Task[]> {
        let params = new HttpParams();
        if (criteria && criteria.status) {
            params = params.set('status', criteria.status);
        }
        if (criteria && criteria.search) {
            params = params.set('search', criteria.search);
        }
        return this.http.get<Task[]>(this.tasksUrl, {params});
    }

    create(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.tasksUrl}`, task);
    }

    updateStatus(task: Task): Observable<Task> {
        return this.http.patch<Task>(`${this.tasksUrl}/${task.id}/status`, {status: task.status});
    }

    update(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task);
    }

    delete(task: Task): Observable<Task> {
        return this.http.delete<Task>(`${this.tasksUrl}/${task.id}`);
    }
}
