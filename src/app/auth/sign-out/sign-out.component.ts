import { Component, OnInit } from '@angular/core';
import {TasksStore} from '../../tasks/store/tasks.store';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private readonly store: TasksStore) { }

  ngOnInit() {
      sessionStorage.removeItem('id_token');
      this.store.clear();
  }
}
