import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CodeEditorRouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();
  private envEmulatorUri = environment.composeEnvEmulatorUrl();

  private readonly routes = {
    getRootDirectory: `${this.bookApiUri}/api/v1/directory/get-root-directory`,
    addFileToDirectory: `${this.bookApiUri}/api/v1/directory/add-file`,
    getFilesFromDirectory: `${this.bookApiUri}/api/v1/directory/get-files`,
    getSubdirectories: `${this.bookApiUri}/api/v1/directory/get-subdirectories`,
    createDirectory: `${this.bookApiUri}/api/v1/directory/add-directory`,
    removeFile: `${this.bookApiUri}/api/v1/directory/remove-file`,
    removeDirectory: `${this.bookApiUri}/api/v1/directory/remove-directory`,
    getFileContent: `${this.bookApiUri}/api/v1/directory/get-file-content`,
    updateFileContent: `${this.bookApiUri}/api/v1/directory/update-file-content`,
    renameFile: `${this.bookApiUri}/api/v1/directory/rename-file`,
    renameDirectory: `${this.bookApiUri}/api/v1/directory/rename-directory`,
    runProject: `${this.bookApiUri}/api/environment-emulator/build-and-run`,
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

  renameFile(): string {
    return `${this.routes.renameFile}`;
  }

  renameDirectory(): string {
    return `${this.routes.renameDirectory}`;
  }

  runProject(codeProjectUuid: string): string {
    return `${this.routes.runProject}/${codeProjectUuid}`;
  }
}
