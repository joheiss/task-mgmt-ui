import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signup: FormGroup;
    message = '';

    constructor(private readonly router: Router,
                private readonly authService: AuthService
    ) {
    }

    ngOnInit() {
        this.signup = this.buildForm();
    }

    onSubmit() {
        console.log(this.signup.value);
        this.authService.signup(this.signup.value)
            .pipe(
                tap(() => this.message = ''),
                tap(() => this.router.navigateByUrl('/auth/signin')),
                catchError((res: HttpErrorResponse) => {
                    console.log(res.error.message);
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
