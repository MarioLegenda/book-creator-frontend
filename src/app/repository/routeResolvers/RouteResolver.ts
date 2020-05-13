import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Pagination} from "../../views/manager/shared/Pagination";

@Injectable({
  providedIn: 'root',
})
export class RouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    getPageByUuid: `${this.bookApiUri}/api/v1/pages/get-by-uuid/:pageUuid`,
    createEmptyPage: `${this.bookApiUri}/api/v1/pages/create/empty-page`,
    findUuidByShortId: `${this.bookApiUri}/api/v1/pages/get-uuid-by-shortId`,
    createCodeProject: `${this.bookApiUri}/api/v1/code-projects/create`,
    getProjectsBySource: `${this.bookApiUri}/api/v1/code-projects/get-by-knowledge-source`,
    getProjects: `${this.bookApiUri}/api/v1/code-projects`,
    getProjectUuidByShortId: `${this.bookApiUri}/api/v1/code-projects/get-project-uuid`,
    getSingleProject: `${this.bookApiUri}/api/v1/code-projects/get`,
  };

  getPageByUuid(pageUuid: string): string {
    return this.routes.getPageByUuid.replace(/:pageUuid/, pageUuid);
  }

  createEmptyPage(): string {
    return this.routes.createEmptyPage;
  }

  findUuidByShortId(shortId: string): string {
    return `${this.routes.findUuidByShortId}/${shortId}`;
  }

  createCodeProject(): string {
    return this.routes.createCodeProject;
  }

  getProjectsBySource(sourceId: string, size: number, page: number): string {
    return `${this.routes.getProjectsBySource}/${sourceId}?pagination.size=${size}&pagination.page=${page}`;
  }

  getProjects(pagination: Pagination, filters: string[]): string {
    return `${this.routes.getProjects}?filters=${filters.join(',')}&pagination.size=${pagination.size}&pagination.page=${pagination.page}`;
  }

  getProjectUuidByShortId(shortId: string): string {
    return `${this.routes.getProjectUuidByShortId}/${shortId}`;
  }

  getSingleProject(uuid: string): string {
    return `${this.routes.getSingleProject}/${uuid}`;
  }
}
