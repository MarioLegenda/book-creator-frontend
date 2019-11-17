import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AutoIncrementIndexFactory} from "../../library/AutoIncrementIndexFactory";
import {ActionSubscriber} from "./ActionSubscriber";

@Injectable()
export class ComponentTracker {
  components = {};

  private textBlockActions: Observable<{
    internalName: string;
    text: string;
    shortDescription: string;
    componentType: string;
    uuid: string;
    type: string;
  }>;

  constructor(
    private store: Store<any>,
    private indexFactory: AutoIncrementIndexFactory
  ) {
    this.indexFactory.update(this.componentsLen());

    const actionSubscriber = new ActionSubscriber();

    actionSubscriber.textBlockCreatedSubscriber(
      this.textBlockActions = this.store.pipe(select('textBlockActions')),
      this
    );
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

  reset() {
    this.components = {};
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
