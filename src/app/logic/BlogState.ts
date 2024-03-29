export class BlogState {
  public static readonly DRAFT: string = 'draft';
  public static readonly PUBLISHED: string = 'published';
  public static readonly CHANGED: string = 'changed';

  public static toArray(): string[] {
    return [
      BlogState.DRAFT,
      BlogState.PUBLISHED,
      BlogState.CHANGED,
    ]
  }
}
