import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CodeEditorRouteResolver {
  private readonly routes = {
    getRootDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/get-root-directory`,
    addFileToDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/add-file-to-directory`,
    getFilesFromDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/get-directory-files`,
    getSubdirectories: `${environment.composeBaseUrl()}/api/v1/code-projects/get-subdirectories`,
    createDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/add-directory`,
    removeFile: `${environment.composeBaseUrl()}/api/v1/code-projects/remove-file`,
    removeDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/remove-directory`,
    getFileContent: `${environment.composeBaseUrl()}/api/v1/code-projects/get-file-content`,
    updateFileContent: `${environment.composeBaseUrl()}/api/v1/code-projects/update-file-content`,
  };

  getRootDirectory(codeProjectUuid: string): string {
    return `${this.routes.getRootDirectory}/${codeProjectUuid}`;
  }

  addFileToDirectory(): string {
    return `${this.routes.addFileToDirectory}`;
  }

  getFilesFromDirectory(directoryId: string): string {
    return `${this.routes.getFilesFromDirectory}/${directoryId}`;
  }

  getSubdirectories(directoryId: string): string {
    return `${this.routes.getSubdirectories}/${directoryId}`;
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

  getFileContent(fileId: string): string {
    return `${this.routes.getFileContent}/${fileId}`;
  }

  updateFileContent(): string {
    return `${this.routes.updateFileContent}`;
  }
}
