import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task, TaskStatus} from '../task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

    @Input() task: Task;
    @Output() delete = new EventEmitter<Task>();
    @Output() status = new EventEmitter<Task>();

    readonly statuses = Object.values(TaskStatus);

    onStatusChanged(event): void {
        this.status.emit({...this.task, status: event.value });
    }

    onDelete(task: Task): void {
        this.delete.emit(task);
    }
}
