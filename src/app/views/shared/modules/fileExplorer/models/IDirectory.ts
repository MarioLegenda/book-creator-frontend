export interface IDirectory {
  readonly children: string[];
  readonly id: string;
  name: string;
  type: string;
  readonly isRoot: boolean;
  readonly parent: any;
  readonly depth: number;
  readonly codeProjectUuid: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
