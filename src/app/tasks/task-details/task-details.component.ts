import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TaskStatus} from '../task.model';
import {TasksStore} from '../store/tasks.store';
import {of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent implements OnInit {

    form: FormGroup;
    task: Task;

    readonly statuses = Object.values(TaskStatus);

    constructor(private readonly router: Router,
                private readonly route: ActivatedRoute,
                private readonly store: TasksStore) {
    }

    ngOnInit() {
        this.form = this.buildForm();
        this.route.paramMap
            .pipe(
                map(params => params.get('id')),
                switchMap(param => {
                    if (param === 'new') {
                        return of({ status: TaskStatus.OPEN } as Task);
                    } else {
                        return this.store.getOne(+param);
                    }
                }),
                catchError(err => of(null))
            )
            .subscribe(task => {
                this.task = task;
                if (!this.task) {
                    return this.router.navigateByUrl('/tasks');
                }
                this.form.patchValue(this.task);
            });
    }

    onSave(values: any): void {
        let task: Task;
        if (!this.task.id) {
            task = { title: values.title, description: values.description };
            this.store.add(task).pipe(take(1)).subscribe();
        } else {
            task = {...this.task, ...values };
            this.store.update(task).pipe(take(1)).subscribe();
        }
        this.router.navigateByUrl('/tasks');
    }

    private buildForm(): FormGroup {
        return new FormGroup({
            title: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
            description: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
            status: new FormControl('', {validators: [Validators.required]})
        });
    }
}
