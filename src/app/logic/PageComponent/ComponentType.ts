export class ComponentType {
  public static readonly TEXT_BLOCK_TYPE = 'text_block';
  public static readonly CODE_BLOCK_TYPE = 'code_block';

  static isTextBlock(type: string): boolean {
    return ComponentType.TEXT_BLOCK_TYPE === type;
  }
}
