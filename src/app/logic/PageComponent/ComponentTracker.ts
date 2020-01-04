import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {AutoIncrementIndexFactory} from "../../library/AutoIncrementIndexFactory";
import Util from 'src/app/library/Util';
import PositionMap from './PositionMap';

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  components = {};

  constructor(
    private indexFactory: AutoIncrementIndexFactory,
    private positionMap: PositionMap,
  ) {
    this.indexFactory.update(this.maxIndex());
  }

  bulkAdd(components: IComponent[]): void {
    for (const c of components) {
      this.add(c);
    }
  }

  add(component: IComponent): void {
    component.value.position = this.indexFactory.increment();

    this.positionMap.add(component.value.position);

    this.components[this.positionMap.getIndex(component.value.position)] = component;
  }

  has(position: number): boolean {
    const idx = this.positionMap.getIndex(position);

    return (this.components[idx]) ? true : false;
  }

  hasBy(fn: Function): boolean {
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

  remove(position: number): void {
    const c = Util.objectFilter(this.components, (_, val: any) => val.value.position === position);

    delete this.components[Object.keys(c)[0]];

    this.positionMap.remove(position);

    if (this.componentLen() === 0) {
      this.indexFactory.reset();
    }
  }

  nextPosition(): number {
    this.indexFactory.update(this.maxIndex());

    return this.indexFactory.increment();
  }

  reset(): void {
    this.components = {};
    this.positionMap.reset();
  }

  private maxIndex(): number {
    const positions = Object.entries(this.components).map((val: any) => {
      return val[1].value.position;
    });

    if (positions.length === 0) {
      return 0;
    }

    return Math.max(...positions);
  }

  private componentLen(): number {
    const keys = Object.keys(this.components);
    let num = 0;
    for (const c of keys) {
      num++;
    }

    return num;
  }
}
