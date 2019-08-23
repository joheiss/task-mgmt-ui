import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from './error-dialog.component';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
    isDialogOpen = false;

  constructor(public dialog: MatDialog) { }

  openDialog(data: any): any {
      if (this.isDialogOpen) {
          return false;
      }
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(ErrorDialogComponent, { width: '30rem', panelClass: 'jo-error-dialog', data });
      dialogRef.afterClosed()
          .pipe(
              tap(() => this.isDialogOpen = false)
          )
          .subscribe();
  }
}
