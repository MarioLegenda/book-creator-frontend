import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  components = {};

  add(name: string, component: IComponent): void {
    this.components[name] = component;
  }

  has(name: string): boolean {
    return Object.keys(this.components).includes(name);
  }
}
