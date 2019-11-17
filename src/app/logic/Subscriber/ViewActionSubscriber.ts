import {Injectable} from "@angular/core";
import {ComponentTracker} from "../PageComponent/ComponentTracker";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/viewActions";
import {IComponent} from "../PageComponent/IComponent";
import {ComponentFactory} from "../PageComponent/ComponentFactory";

@Injectable()
export class ViewActionSubscriber {
  constructor(
    private store: Store<any>,
    public componentTracker: ComponentTracker
  ) {
    this.subscribeToViewActions(store.pipe(select('viewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_ADD_TEXT_BLOCK: {
          const component: IComponent = ComponentFactory.createComponent(action);

          this.componentTracker.add(component);

          break;
        }

        case actionTypes.VIEW_ADD_TEXT_BLOCK: {
          if (this.componentTracker.has(action.value.$index)) {
            this.componentTracker.remove(action.value.$index);
          }

          break;
        }
      }
    });
  }
}
