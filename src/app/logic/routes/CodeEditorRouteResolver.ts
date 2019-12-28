import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CodeEditorRouteResolver {
  private readonly routes = {
    getRootDirectory: `${environment.composeBaseUrl()}/api/v1/directory/get-root-directory`,
    addFileToDirectory: `${environment.composeBaseUrl()}/api/v1/directory/add-file`,
    getFilesFromDirectory: `${environment.composeBaseUrl()}/api/v1/directory/get-files`,
    getSubdirectories: `${environment.composeBaseUrl()}/api/v1/directory/get-subdirectories`,
    createDirectory: `${environment.composeBaseUrl()}/api/v1/directory/add-directory`,
    removeFile: `${environment.composeBaseUrl()}/api/v1/directory/remove-file`,
    removeDirectory: `${environment.composeBaseUrl()}/api/v1/directory/remove-directory`,
    getFileContent: `${environment.composeBaseUrl()}/api/v1/directory/get-file-content`,
    updateFileContent: `${environment.composeBaseUrl()}/api/v1/directory/update-file-content`,
  };

  getRootDirectory(codeProjectUuid: string): string {
    return `${this.routes.getRootDirectory}/${codeProjectUuid}`;
  }

  addFileToDirectory(): string {
    return `${this.routes.addFileToDirectory}`;
  }

  getFilesFromDirectory(codeProjectUuid: string, directoryId: string): string {
    return `${this.routes.getFilesFromDirectory}/${codeProjectUuid}/${directoryId}`;
  }

  getSubdirectories(codeProjectUuid: string, directoryId: string): string {
    return `${this.routes.getSubdirectories}/${codeProjectUuid}/${directoryId}`;
  }

  createDirectory(): string {
    return `${this.routes.createDirectory}`;
  }

  removeFile(): string {
    return `${this.routes.removeFile}`;
  }

  removeDirectory(): string {
    return `${this.routes.removeDirectory}`;
  }

  getFileContent(codeProjectUuid: string, fileId: string): string {
    return `${this.routes.getFileContent}/${codeProjectUuid}/${fileId}`;
  }

  updateFileContent(): string {
    return `${this.routes.updateFileContent}`;
  }
}
