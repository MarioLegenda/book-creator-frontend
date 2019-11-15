import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/actions";
import {ComponentFactory} from "./ComponentFactory";
import {AutoIncrementIndexFactory} from "../../library/AutoIncrementIndexFactory";

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

  constructor(
    private store: Store<any>,
    private indexFactory: AutoIncrementIndexFactory
  ) {
    this.indexFactory.update(this.componentsLen());

    this.textBlockActions = store.pipe(select('textBlockActions'));

    this.textBlockActions.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.TEXT_BLOCK_CREATED: {
          const component: IComponent = ComponentFactory.createComponent(action);

          this.add(component);

          break;
        }

        case actionTypes.TEXT_BLOCK_REMOVED: {
          if (this.has(action.value.$index)) {
            this.remove(action.value.$index);
          }

          break;
        }
      }
    });
  }

  add(component: IComponent): void {
    component.value.$index = this.indexFactory.increment();

    this.components[component.value.$index] = component;
  }

  has(index: number): boolean {
    return (this.components[index]);
  }

  hasBy(fn: Function) {
    const keys = Object.keys(this.components);

    for (const key of keys) {
      const val = this.components[key];

      const res = fn.call(null, val.value);

      if (res === true) {
        return true;
      }
    }

    return false;
  }

  remove(index: number): void {
    delete this.components[index];

    if (this.componentsLen() === 0) {
      this.indexFactory.reset();
    }
  }

  private componentsLen(): number {
    const keys = Object.keys(this.components);
    let num = 0;
    for (const c of keys) {
      num++;
    }

    return num;
  }
}
