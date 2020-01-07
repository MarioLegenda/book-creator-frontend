import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    addNewTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/add-new-block`,
    addNewCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/add-new-block`,
    getPageByUuid: `${this.bookApiUri}/api/v1/pages/get-by-uuid/:pageUuid`,
    removeBlock: `${this.bookApiUri}/api/v1/pages/text-block/remove`,
    updateBlock: `${this.bookApiUri}/api/v1/pages/text-block/update-block`,
    createEmptyPage: `${this.bookApiUri}/api/v1/pages/create/empty-page`,
    findUuidByShortId: `${this.bookApiUri}/api/v1/pages/get-uuid-by-shortId`,
    createCodeProject: `${this.bookApiUri}/api/v1/code-projects/create`,
    getProjectsBySource: `${this.bookApiUri}/api/v1/code-projects/get-by-knowledge-source`,
    getProjects: `${this.bookApiUri}/api/v1/code-projects`,
    getProjectUuidByShortId: `${this.bookApiUri}/api/v1/code-projects/get-project-uuid`,
    getSingleProject: `${this.bookApiUri}/api/v1/code-projects/get`,
  };

  addNewCodeBlock(): string {
    return this.routes.addNewTextBlock;
  }

  addNewTextBlock(): string {
    return this.routes.addNewTextBlock;
  }

  getPageByUuid(pageUuid: string): string {
    return this.routes.getPageByUuid.replace(/:pageUuid/, pageUuid);
  }

  removeBlock(): string {
    return this.routes.removeBlock;
  }

  updateBlock(): string {
    return this.routes.updateBlock;
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

  getProjects(size: number, page: number): string {
    return `${this.routes.getProjects}?pagination.size=${size}&pagination.page=${page}`;
  }

  getProjectUuidByShortId(shortId: string): string {
    return `${this.routes.getProjectUuidByShortId}/${shortId}`;
  }

  getSingleProject(uuid: string): string {
    return `${this.routes.getSingleProject}/${uuid}`;
  }
}
