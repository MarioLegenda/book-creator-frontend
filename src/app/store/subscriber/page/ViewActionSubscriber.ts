import {Injectable} from "@angular/core";
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../page/viewActions";
import {ComponentFactory} from "../../../logic/PageComponent/ComponentFactory";

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
          this.removeBlock(action);

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

        case actionTypes.VIEW_ADD_MULTIMEDIA_BLOCK: {
          this.addMultimediaBlock(action);

          break;
        }
      }
    });
  }

  private addAllBlocks(action) {
    const blocks = action.blocks;
    const components: any[] = [];

    for (const block of blocks) {
      const component = ComponentFactory.createComponent({
        ...block
      });

      components.push(component);
    }

    this.componentTracker.init(components);
  }

  private addCodeBlock(action) {
    const component = ComponentFactory.createComponent(action);

    this.componentTracker.add(component);
  }

  private addTextBlock(action) {
    const component = ComponentFactory.createComponent(action);

    this.componentTracker.add(component);
  }

  private removeBlock(action) {
    this.componentTracker.remove(action.position);
  }

  private addMultimediaBlock(action) {
    const component = ComponentFactory.createComponent(action);

    this.componentTracker.add(component);
  }
}
