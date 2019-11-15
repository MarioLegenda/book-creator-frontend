import {ComponentType} from "./ComponentType";
import {IComponent} from "./IComponent";
import deepcopy from 'deepcopy';

export class ComponentFactory {
  public static createComponent(data): IComponent {
    switch (data.componentType) {
      case ComponentType.TEXT_BLOCK_TYPE: {
        const d = deepcopy(data);

        return {
          componentType: ComponentType.TEXT_BLOCK_TYPE,
          value: {
            componentType: ComponentType.TEXT_BLOCK_TYPE,
            type: d.type,
            internalName: d.internalName,
            shortDescription: d.shortDescription,
          },
        };
      }
    }
  }
}
