import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/actions";
import deepcopy from 'deepcopy';
import {ComponentFactory} from "./ComponentFactory";

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  components = {};

  private textBlockActions: Observable<{
    internalName: string;
    shortDescription: string;
    componentType: string;
    type: string
  }>;

  constructor(private store: Store<any>) {
    this.textBlockActions = store.pipe(select('textBlockActions'));

    this.textBlockActions.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.TEXT_BLOCK_CREATED: {
          const component: IComponent = ComponentFactory.createComponent(action);

          this.add(component.value.internalName, component);

          break;
        }

        case actionTypes.TEXT_BLOCK_REMOVED: {
          if (this.has(action.value.internalName)) {
            this.remove(action.value.internalName);
          }

          break;
        }
      }
    });
  }

  add(name: string, component: IComponent): void {
    this.components[name] = component;
  }

  has(name: string): boolean {
    return Object.keys(this.components).includes(name);
  }

  remove(name: string): void {
    delete this.components[name];
  }
}
