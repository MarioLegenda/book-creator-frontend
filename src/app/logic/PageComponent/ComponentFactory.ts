import {ComponentType} from "./ComponentType";
import deepcopy from 'deepcopy';

export class ComponentFactory {
  public static createComponent(data) {
    switch (data.blockType) {
      case ComponentType.TEXT_BLOCK_TYPE: {
        const d = deepcopy(data);

        delete d.type;

        return d;
      }

      case ComponentType.CODE_BLOCK_TYPE: {
        const d = deepcopy(data);

        delete d.type;

        return d;
      }
    }
  }
}
