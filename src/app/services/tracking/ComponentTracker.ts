import {IComponent} from "./IComponent";

export class ComponentTracker {
  components = [];

  add(component: IComponent) {
    this.components.push(component);
  }
}

