import {Injectable} from "@angular/core";
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../page/viewActions";
import {IComponent} from "../../../logic/PageComponent/IComponent";
import {ComponentFactory} from "../../../logic/PageComponent/ComponentFactory";
import {ComponentType} from "../../../logic/PageComponent/ComponentType";

@Injectable({
  providedIn: 'root',
})
export class ViewActionSubscriber {
  constructor(
    private store: Store<any>,
    public componentTracker: ComponentTracker
  ) {
    this.subscribeToViewActions(store.pipe(select('pageViewActions')));
  }

  private subscribeToViewActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_ADD_TEXT_BLOCK: {
          this.addTextBlock(action);

          break;
        }

        case actionTypes.VIEW_TEXT_BLOCK_REMOVED: {
          this.removeTextBlock(action);

          break;
        }

        case actionTypes.VIEW_ADD_CODE_BLOCK: {
          this.addCodeBlock(action);

          break;
        }

        case actionTypes.VIEW_ADD_ALL_BLOCKS: {
          this.addAllBlocks(action);

          break;
        }
      }
    });
  }

  private addAllBlocks(action) {
    const blocks = action.blocks;
    const components: IComponent[] = [];

    for (const block of blocks) {
      if (ComponentType.isTextBlock(block.blockType)) {
        const component: IComponent = ComponentFactory.createComponent({
          ...block
        });

        components.push(component);
      }
    }

    this.componentTracker.init(components);
  }

  private addCodeBlock(action) {
    const component: IComponent = ComponentFactory.createComponent(action);

    this.componentTracker.add(component);
  }

  private addTextBlock(action) {
    const component: IComponent = ComponentFactory.createComponent(action);

    this.componentTracker.add(component);
  }

  private removeTextBlock(action) {
    this.componentTracker.remove(action.position);
  }
}
