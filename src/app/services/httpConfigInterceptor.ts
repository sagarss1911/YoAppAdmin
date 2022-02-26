import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authservice: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error, caught) => {
            this.handleAuthError(error);
            return throwError(error);
        }) as any);
    }

    private handleAuthError(err: HttpErrorResponse) {
        if (err.status === 401) {
            if (localStorage.getItem('token') != null) {
                this.router.navigate(['/settings/profile']);
            } else {
                this.router.navigate(['/login']);
            }
        }
    }
}
