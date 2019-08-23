import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorDialogService} from '../shared/error-dialog/error-dialog.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public errorDialogService: ErrorDialogService,
                private readonly router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = sessionStorage.getItem('id_token');
        if (idToken) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + idToken)});
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }

        req = req.clone({headers: req.headers.set('Accept', 'application/json')});

        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    console.log('intercepted error: ', err);
                    const data: any = {};
                    if (err.status === 0 ) {
                        data.reason = err.message;
                        data.message = `Service is currently not available! Please try again later.`;
                    } else {
                        data.reason = err && err.error && err.error.reason ? err.error.reason : '';
                        data.message = err.message;
                    }
                    data.status = err.status;
                    if (err.status === 401) {
                        this.router.navigateByUrl('/auth/signin');
                    } else if (err.status !== 404) {
                        this.errorDialogService.openDialog(data);
                    }
                    return throwError(err);
                })
            );
    }
}
