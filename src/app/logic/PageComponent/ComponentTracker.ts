import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {PositionMap} from "./PositionMap";

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  private componentSubject = new Subject();
  private positionSubject = new Subject();

  private subscribers = [];

  constructor(
    private positionMap: PositionMap
  ) {}

  init(components: any[]): void {
    let max: number = 0;
    for (const c of components) {
      if (c.position > max) max = c.position;

      this.add(c);
    }

    this.positionMap.setMax(max);
  }

  add(component): void {
    this.componentSubject.next(component);
  }

  remove(position: number): void {
    this.positionSubject.next(position);
  }

  getNextPosition(): number {
    return this.positionMap.next();
  }

  componentSubscribe(fn) {
    const s = this.componentSubject.subscribe((val: any) => {
      fn.call(null, val);
    });

    this.subscribers.push(s);

    return s;
  }

  positionSubscribe(fn) {
    const s = this.positionSubject.subscribe((val: any) => {
      fn.call(null, val);
    });

    this.subscribers.push(s);

    return s;
  }

  destroy(): void {
    for (const s of this.subscribers) {
      s.unsubscribe();
    }

    this.subscribers = [];
  }
}
