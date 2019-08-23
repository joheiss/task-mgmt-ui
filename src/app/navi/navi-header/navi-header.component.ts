import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-navi-header',
    templateUrl: './navi-header.component.html',
    styleUrls: ['./navi-header.component.scss']
})
export class NaviHeaderComponent {

    @Output() toggle = new EventEmitter<void>();

    constructor() {
    }

    onToggle() {
        this.toggle.emit();
    }
}
