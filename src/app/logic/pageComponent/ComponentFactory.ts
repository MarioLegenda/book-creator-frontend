import {ComponentType} from "./ComponentType";

export class ComponentFactory {
  public static createComponent(data) {
    switch (data.componentType) {
      case ComponentType.TEXT_BLOCK_TYPE: {
        delete data.componentType;

        return {
          type: ComponentType.TEXT_BLOCK_TYPE,
          value: data,
        };
      }
    }
  }
}
