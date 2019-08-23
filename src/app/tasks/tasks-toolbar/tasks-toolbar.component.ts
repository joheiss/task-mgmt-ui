import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskFilter, TaskStatus} from '../task.model';
import {TasksStore} from '../store/tasks.store';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {TasksState} from '../store/tasks.state';

@Component({
    selector: 'app-tasks-toolbar',
    templateUrl: './tasks-toolbar.component.html',
    styleUrls: ['./tasks-toolbar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksToolbarComponent implements OnInit {

    @Input() filters: TaskFilter;

    form: FormGroup;
    readonly statuses = [
        'No status filter',
        ...Object.values(TaskStatus)
    ];

    constructor(private readonly store: TasksStore) {
    }

    ngOnInit() {
        this.form = this.buildForm();
        if (this.filters) {
            this.form.patchValue(this.filters, {emitEvent: false});
        }
        this.form.valueChanges
            .pipe(
                debounceTime(500),
                map(changes => {
                    if (changes.status && changes.status === 'No status filter') {
                        changes.status = undefined;
                    }
                    return changes;
                }),
                distinctUntilChanged(),
                switchMap(changes => this.store.updateFilters(changes))
            )
            .subscribe();
    }

    private buildForm(): FormGroup {
        return new FormGroup({
            search: new FormControl(''),
            status: new FormControl('')
        });
    }
}
