import {ComponentType} from "./ComponentType";
import {IComponent} from "./IComponent";
import {actionTypes} from "../../store/page/viewActions";
import deepcopy from 'deepcopy';

export class ComponentFactory {
  public static createComponent(data): IComponent {
    switch (data.blockType) {
      case ComponentType.TEXT_BLOCK_TYPE: {
        const d = deepcopy(data);

        return {
          componentType: ComponentType.TEXT_BLOCK_TYPE,
          value: {
            ...{componentType: ComponentType.TEXT_BLOCK_TYPE},
            ...d
          },
        };
      }

      case actionTypes.VIEW_ADD_CODE_BLOCK: {
        const d = deepcopy(data);

        return {
          componentType: ComponentType.CODE_BLOCK_TYPE,
          value: {
            ...{componentType: ComponentType.CODE_BLOCK_TYPE},
            ...d
          },
        };
      }
    }
  }
}
