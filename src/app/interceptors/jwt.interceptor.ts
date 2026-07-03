import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('accessToken');

        // Don't attach token to login endpoint
        if (req.url.includes('/api/auth/login')) {
            return next.handle(req);
        }

        if (token) {

            const clonedRequest = req.clone({

                setHeaders: {
                    Authorization: `Bearer ${token}`
                }

            });

            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}