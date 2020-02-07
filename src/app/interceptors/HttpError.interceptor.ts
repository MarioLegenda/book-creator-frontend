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
import {Injectable} from "@angular/core";
import {globalServerError} from "../store/global/actions";

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<any>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let err: any = {};
          if (error.error instanceof ErrorEvent) {
          } else {
            err.type = 'http_error';

            this.store.dispatch(globalServerError({
              title: 'Server error',
              description: 'There has been a server error. Sorry about that. We are working hard on solving the problem. Thank you for your patience. In order to try to fix the problem, the application will refresh in 15 seconds. You can refresh it yourself by clicking the \'Refresh\' button.',
              runCounter: true,
            }));
          }

          return throwError(err);
        })
      )
  }
}
