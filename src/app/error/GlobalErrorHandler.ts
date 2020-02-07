import {Injectable, ErrorHandler} from "@angular/core";
import {Store} from "@ngrx/store";
import {globalClientError} from "../store/global/actions";

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private store: Store<any>
  ) {}

  handleError(error) {
    if (error.type === 'http_error') return;

    this.store.dispatch(globalClientError({
      title: 'Internal application error',
      description: 'There has been an internal error. Sorry about that. Our developers are already informed and are looking into it. In order to try to fix the problem, the application will refresh in 15 seconds. You can refresh it yourself by clicking the \'Refresh\' button.',
      runCounter: true,
    }))
  }
}
