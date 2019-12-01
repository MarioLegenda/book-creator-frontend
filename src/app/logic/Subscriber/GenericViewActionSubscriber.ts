import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {actionTypes} from "../../store/viewActions";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GenericViewActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.subscribeToViewActions(store.pipe(select('viewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    this.observable = observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_PRESENTATION_CREATE: {
          this.router.navigate(['/page', action.presentation.shortId, action.emptyPage.shortId]);
          break;
        }
      }
    });
  }

  destroy() {
    this.observable.unsubscribe();
  }
}
