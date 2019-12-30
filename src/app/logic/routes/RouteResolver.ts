import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    addNewTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/add-new-block`,
    getPageByUuid: `${this.bookApiUri}/api/v1/pages/get-by-uuid/:pageUuid`,
    removeBlock: `${this.bookApiUri}/api/v1/pages/text-block/remove`,
    updateBlock: `${this.bookApiUri}/api/v1/pages/text-block/update-block`,
    createPresentation: `${this.bookApiUri}/api/v1/knowledge-source/create/presentation`,
    createEmptyPage: `${this.bookApiUri}/api/v1/pages/create/empty-page`,
    findUuidByShortId: `${this.bookApiUri}/api/v1/pages/get-uuid-by-shortId`,
    getPresentationUuidByShortId: `${this.bookApiUri}/api/v1/knowledge-source/get/presentation/uuid`,
    getPresentation: `${this.bookApiUri}/api/v1/knowledge-source/get/presentation/by-uuid`,
    createCodeProject: `${this.bookApiUri}/api/v1/code-projects/create`,
    getProjectsBySource: `${this.bookApiUri}/api/v1/code-projects/get-by-knowledge-source`,
    getProjects: `${this.bookApiUri}/api/v1/code-projects`,
    getProjectUuidByShortId: `${this.bookApiUri}/api/v1/code-projects/get-project-uuid`,
    getSingleProject: `${this.bookApiUri}/api/v1/code-projects/get`,
  };

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

  createPresentation(): string {
    return this.routes.createPresentation;
  }

  createEmptyPage(): string {
    return this.routes.createEmptyPage;
  }

  findUuidByShortId(shortId: string): string {
    return `${this.routes.findUuidByShortId}/${shortId}`;
  }

  getPresentationUuid(shortId: string): string {
    return `${this.routes.getPresentationUuidByShortId}/${shortId}`;
  }

  getPresentation(uuid: string): string {
    return `${this.routes.getPresentation}/${uuid}`;
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
