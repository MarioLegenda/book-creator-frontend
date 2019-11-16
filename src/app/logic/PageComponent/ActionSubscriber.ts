import {Observable} from "rxjs";
import {ComponentTracker} from "./ComponentTracker";
import {actionTypes} from "../../store/actions";
import {IComponent} from "./IComponent";
import {ComponentFactory} from "./ComponentFactory";

export class ActionSubscriber {
  textBlockCreatedSubscriber(subscriber: Observable<any>, componentTracker: ComponentTracker) {
    subscriber.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.TEXT_BLOCK_CREATED: {
          const component: IComponent = ComponentFactory.createComponent(action);

          componentTracker.add(component);

          break;
        }

        case actionTypes.TEXT_BLOCK_REMOVED: {
          if (componentTracker.has(action.value.$index)) {
            componentTracker.remove(action.value.$index);
          }

          break;
        }
      }
    });
  }
}
