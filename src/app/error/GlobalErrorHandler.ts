import {Injectable, ErrorHandler} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error) {
    if (error.message === 'Uncaught (in promise): http_error') return;

    throw new Error(error);
  }
}
