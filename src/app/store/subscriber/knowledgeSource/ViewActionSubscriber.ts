import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {actionTypes} from "../../knowledgeSource/viewActions";

@Injectable({
  providedIn: 'root',
})
export class ViewActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.subscribeToViewActions(store.pipe(select('knowledgeSourceViewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    this.observable = observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_PRESENTATION_CREATE: {
          this.router.navigate(['/page', 'presentation', action.presentation.shortId, action.emptyPage.shortId]);

          break;
        }
      }
    });
  }

  destroy() {
    this.observable.unsubscribe();
  }
}
