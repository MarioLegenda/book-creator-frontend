export class ComponentType {
  public static readonly TEXT_BLOCK_TYPE = 'text_block';
  public static readonly CODE_BLOCK_TYPE = 'code_block';
  public static readonly MULTIMEDIA_BLOCK_TYPE = 'multimedia_block';
  public static readonly MAIN_HEADER_BLOCK = 'main_header_block';

  static isTextBlock(component): boolean {
    return ComponentType.TEXT_BLOCK_TYPE === component.blockType;
  }

  static isCodeBlock(component): boolean {
    return ComponentType.CODE_BLOCK_TYPE === component.blockType;
  }

  static isMultimediaBlock(component): boolean {
    return ComponentType.MULTIMEDIA_BLOCK_TYPE === component.blockType;
  }

  static isMainHeaderBlock(component): boolean {
    return ComponentType.MAIN_HEADER_BLOCK === component.blockType;
  }
}
