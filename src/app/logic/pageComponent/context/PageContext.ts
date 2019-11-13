import {IContext} from "./IContext";

export class PageContext implements IContext {
  internalName: string = null;
  uuid: string = null;

  isValidContext(): boolean {
    if (!this.uuid) {
      return false;
    }

    return true;
  }
}
