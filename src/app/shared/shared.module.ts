import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from '../auth/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {ErrorDialogService} from './error-dialog/error-dialog.service';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        ErrorDialogService,
    ],
    entryComponents: [ErrorDialogComponent],
})
export class SharedModule {
}
