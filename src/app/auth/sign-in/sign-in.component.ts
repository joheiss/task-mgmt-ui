import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY, of} from 'rxjs';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signin: FormGroup;
    message = '';

    constructor(private readonly router: Router,
                private readonly authService: AuthService
    ) {
    }

    ngOnInit() {
        this.signin = this.buildForm();
    }

    onSubmit() {
        console.log(this.signin.value);
        this.authService.signin(this.signin.value)
            .pipe(
                take(1),
                tap(() => this.message = ''),
                tap(() => this.router.navigateByUrl('/tasks')),
                catchError((res: HttpErrorResponse) => {
                    console.log('The response from the server: ', res);
                    this.message = res.error.message;
                    return of(EMPTY);
                })
            )
            .subscribe();
    }

    private buildForm(): FormGroup {
        return new FormGroup({
            username: new FormControl('', {validators: [Validators.required, Validators.minLength(4), Validators.max(20)]}),
            password: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(20),
                    Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
                ]
            })
        });
    }
}
