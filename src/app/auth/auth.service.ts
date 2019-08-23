import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from './credentials.interface';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authUrl = `${environment.baseUrl}/auth`;

    constructor(private http: HttpClient) {
    }

    signin(credentials: Credentials): Observable<string> {
        return this.http.post<{ token: string }>(`${this.authUrl}/signin`, credentials)
            .pipe(
                filter(res => res.token && res.token.length > 0),
                map(res => res.token),
                tap(token => sessionStorage.setItem('id_token', token)),
            );
    }

    signup(credentials: Credentials): Observable<any> {
        return this.http.post(`${this.authUrl}/signup`, credentials);
    }

    isTokenValid(): boolean {
        const token = sessionStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        const decoded = jwt_decode(token);
        if (!decoded.exp) {
            return true;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date.valueOf() > new Date().valueOf();
    }
}
