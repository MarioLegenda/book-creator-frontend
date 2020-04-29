import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ViewActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
  ) {
    this.subscribeToViewActions(store.pipe(select('knowledgeSourceViewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    this.observable = observable.subscribe((action: any) => {
      if (!action) {
        return;
      }
    });
  }

  destroy() {
    this.observable.unsubscribe();
  }
}
