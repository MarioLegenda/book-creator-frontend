export interface IFile {
  id: string;
  name: string;
  type: string;
  depth: number;
  content: string;
  searched: boolean;
  directoryId: string;
  codeProjectUuid: string;
  updatedAt?: string;
}
