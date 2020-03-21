import {Injectable} from '@angular/core';
import Cookie from 'js-cookie';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!Cookie.get('token')) {
      return next.handle(request);
    }

    const token = Cookie.get('token');

    request = request.clone({
      setHeaders: {
        'X-REBEL-SOURCE-AUTH': token,
      }
    });

    return next.handle(request);
  }
}
