import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/viewActions";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class GenericViewActionSubscriber {
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.subscribeToHttpActions(store.pipe(select('viewActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_PRESENTATION_CREATE: {
          this.router.navigate(['/page', action.uuid]);
          
          break;
        }
      }
    });
  }
}
