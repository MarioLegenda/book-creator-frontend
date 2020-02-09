import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {Inject, Injectable} from "@angular/core";
import {globalServerError} from "../store/global/actions";
import {Router} from "@angular/router";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<any>,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let message = '';
          if (error.error instanceof ErrorEvent) {
          } else {
            message = 'http_error';

            if (error.status === 404 && error.error.type && error.error.type === 'error') {
              const path = error.error.originUrl;

              const pages = [
                new RegExp('pages/get-uuid-by-shortId'),
                new RegExp('knowledge-source/get/blog/uuid'),
              ];

              let pathFound = false;

              for (const re of pages) {
                if (re.test(path)) {
                  this.document.location.href = '/cms/management/404';

                  pathFound = true;

                  break;
                }
              }

              if (!pathFound) {
                this.store.dispatch(globalServerError({
                  title: 'Server error',
                  description: 'There has been a server error. Sorry about that. We are working hard on solving the problem. Thank you for your patience. In order to try to solve the problem, please refresh the page or press \'Refresh\'',
                  runCounter: false,
                }));
              }
            } else {
              this.store.dispatch(globalServerError({
                title: 'Server error',
                description: 'There has been a server error. Sorry about that. We are working hard on solving the problem. Thank you for your patience. In order to try to solve the problem, please refresh the page or press \'Refresh\'',
                runCounter: false,
              }));
            }
          }

          return throwError(message);
        })
      )
  }
}
