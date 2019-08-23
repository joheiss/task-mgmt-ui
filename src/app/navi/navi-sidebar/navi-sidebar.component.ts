import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-navi-sidebar',
    templateUrl: './navi-sidebar.component.html',
    styleUrls: ['./navi-sidebar.component.scss']
})
export class NaviSidebarComponent {

    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}
