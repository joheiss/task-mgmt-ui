import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule, MatIconModule,
    MatInputModule, MatMenuModule, MatProgressSpinnerModule,
    MatRadioModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';


@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
    ],
})
export class MaterialModule {
}
