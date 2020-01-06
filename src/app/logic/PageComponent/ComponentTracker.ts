import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {PositionMap} from "./PositionMap";

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  private subject = new Subject();
  private subscriber;

  constructor(
    private positionMap: PositionMap
  ) {}

  bulkAdd(components: IComponent[]): void {
    let max: number = 0;
    for (const c of components) {
      if (c.value.position > max) max = c.value.position;

      this.add(c);
    }

    this.positionMap.setMax(max);
  }

  add(component: IComponent): void {
    this.subject.next(component);
  }

  remove(position: number): void {
    this.subject.next(position);
  }

  getNextPosition(): number {
    return this.positionMap.next();
  }

  subscribe(fn) {
    this.subscriber = this.subject.subscribe((val: any) => {
      let type: string = '';

      if (Number.isInteger(val)) {
        type = 'position';
      } else if (Array.isArray(val)) {
        type = 'array';
      } else {
        type = 'component';
      }

      fn.call(null, val, type);
    });

    return this.subscriber;
  }

  destroy(): void {
    this.subscriber.unsubscribe();
    this.subscriber = null;
  }
}
