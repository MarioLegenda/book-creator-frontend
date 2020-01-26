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
}
