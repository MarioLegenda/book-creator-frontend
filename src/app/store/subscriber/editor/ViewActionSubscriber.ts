import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../editor/viewActions";

@Injectable({
  providedIn: 'root',
})
export class ViewActionSubscriber {
  constructor(
    private store: Store<any>,
  ) {
    this.subscribeToViewActions(store.pipe(select('editorViewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_EDITOR_SHOW_FILE: {
        }
      }
    });
  }
}
