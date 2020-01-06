import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {PositionMap} from "./PositionMap";

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  private componentSubject = new ReplaySubject();
  private positionSubject = new ReplaySubject();
  private initSubject = new ReplaySubject();

  private subscribers = [];

  constructor(
    private positionMap: PositionMap
  ) {}

  init(components: IComponent[]): void {
    let max: number = 0;
    for (const c of components) {
      if (c.value.position > max) max = c.value.position;

      this.add(c);
    }

    this.positionMap.setMax(max);
  }

  add(component: IComponent): void {
    this.componentSubject.next(component);
  }

  remove(position: number): void {
    this.positionSubject.next(position);
  }

  getNextPosition(): number {
    return this.positionMap.next();
  }

  initSubscribe(fn) {
    const s = this.initSubject.subscribe((val: any) => {
      fn.call(null, val);
    });

    this.subscribers.push(s);

    return s;
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
