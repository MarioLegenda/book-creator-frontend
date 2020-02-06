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
    if (!Cookie.get('loggedInAccount')) {
      return next.handle(request);
    }

    const loggedInAccount = JSON.parse(Cookie.get('loggedInAccount'));

    request = request.clone({
      setHeaders: {
        'X-REBEL-SOURCE-AUTH': loggedInAccount.token,
      }
    });

    return next.handle(request);
  }
}
