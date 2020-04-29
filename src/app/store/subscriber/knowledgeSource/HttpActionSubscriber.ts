import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PageRepository} from "../../../repository/PageRepository";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
  ) {
    this.subscribeToHttpActions(store.pipe(select('knowledgeSourceHttpActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
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
