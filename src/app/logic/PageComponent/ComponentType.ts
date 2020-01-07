export class ComponentType {
  public static readonly TEXT_BLOCK_TYPE = 'text_block';
  public static readonly CODE_BLOCK_TYPE = 'code_block';

  static isTextBlock(component): boolean {
    return ComponentType.TEXT_BLOCK_TYPE === component.blockType;
  }

  static isCodeBlock(component): boolean {
    return ComponentType.CODE_BLOCK_TYPE === component.blockType;
  }
}
