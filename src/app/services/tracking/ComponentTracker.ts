import {IComponent} from "./IComponent";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentTracker {
  components = [];

  add(component: IComponent) {
    this.components.push(component);
  }
}

