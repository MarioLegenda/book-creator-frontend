import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProjectRouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    createCodeProject: `${this.bookApiUri}/api/v1/code-projects/create`,
    getProjectsBySource: `${this.bookApiUri}/api/v1/code-projects/get-by-knowledge-source`,
    getProjects: `${this.bookApiUri}/api/v1/code-projects`,
    getProjectUuidByShortId: `${this.bookApiUri}/api/v1/code-projects/get-project-uuid`,
    getSingleProject: `${this.bookApiUri}/api/v1/code-projects/get`,
    removeCodeProject: `${this.bookApiUri}/api/v1/code-projects/remove`,
    searchCodeProjects: `${this.bookApiUri}/api/v1/code-projects/search`,
    updateCodeProject: `${this.bookApiUri}/api/v1/code-projects/update`,
    searchDirsAndFiles: `${this.bookApiUri}/api/v1/directory/search`,
    getNext: `${this.bookApiUri}/api/v1/code-projects/get-next`,
    cutFile: `${this.bookApiUri}/api/v1/directory/cut-file`,
    copyFile: `${this.bookApiUri}/api/v1/directory/copy-file`,
    cutDirectory: `${this.bookApiUri}/api/v1/directory/cut-directory`,
    copyDirectory: `${this.bookApiUri}/api/v1/directory/copy-directory`,
    sortByEnvironment: `${this.bookApiUri}/api/v1/code-projects/sort`,
  };

  createCodeProject(): string {
    return this.routes.createCodeProject;
  }

  getProjectsBySource(sourceId: string, size: number, page: number): string {
    return `${this.routes.getProjectsBySource}/${sourceId}?pagination.size=${size}&pagination.page=${page}`;
  }

  getProjects(size: number, page: number): string {
    return `${this.routes.getProjects}?pagination.size=${size}&pagination.page=${page}`;
  }

  getProjectUuidByShortId(shortId: string): string {
    return `${this.routes.getProjectUuidByShortId}/${shortId}`;
  }

  getSingleProject(uuid: string): string {
    return `${this.routes.getSingleProject}/${uuid}`;
  }

  removeCodeProject(): string {
    return this.routes.removeCodeProject;
  }

  searchCodeProjects(filters: string[]): string {
    return `${this.routes.searchCodeProjects}?filters=${filters.join(',')}`;
  }

  updateCodeProject(): string {
    return this.routes.updateCodeProject;
  }

  searchDirsAndFiles(): string {
    return this.routes.searchDirsAndFiles;
  }

  getNext(filters: string[]): string {
    return `${this.routes.getNext}?filters=${filters.join(',')}`;
  }

  cutFile(): string {
    return this.routes.cutFile;
  }

  copyFile(): string {
    return this.routes.copyFile;
  }

  cutDirectory(): string {
    return this.routes.cutDirectory;
  }

  copyDirectory(): string {
    return this.routes.copyDirectory;
  }

  sortByEnvironment(model): string {
    return `${this.routes.sortByEnvironment}?filters=${model.filters.join(',')}`;
  }
}
