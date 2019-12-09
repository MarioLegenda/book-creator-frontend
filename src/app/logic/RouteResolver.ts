import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RouteResolver {
  private readonly routes = {
    addNewTextBlock: `${environment.composeBaseUrl()}/api/v1/pages/text-block/add-new-block`,
    getPageByUuid: `${environment.composeBaseUrl()}/api/v1/pages/get-by-uuid/:pageUuid`,
    removeBlock: `${environment.composeBaseUrl()}/api/v1/pages/text-block/remove`,
    updateBlock: `${environment.composeBaseUrl()}/api/v1/pages/text-block/update-block`,
    createPresentation: `${environment.composeBaseUrl()}/api/v1/presentation/create`,
    createEmptyPage: `${environment.composeBaseUrl()}/api/v1/pages/create/empty-page`,
    findUuidByShortId: `${environment.composeBaseUrl()}/api/v1/pages/get-uuid-by-shortId`,
    getPresentationUuidByShortId: `${environment.composeBaseUrl()}/api/v1/presentation/get-presentation-uuid`,
    getPresentation: `${environment.composeBaseUrl()}/api/v1/presentation/get-presentation`,
    createCodeProject: `${environment.composeBaseUrl()}/api/v1/code-projects/create`,
    getProjectsBySource: `${environment.composeBaseUrl()}/api/v1/code-projects/get-by-source`,
    getProjects: `${environment.composeBaseUrl()}/api/v1/code-projects`,
    getProjectUuidByShortId: `${environment.composeBaseUrl()}/api/v1/code-projects/get-project-uuid`,
    getSingleProject: `${environment.composeBaseUrl()}/api/v1/code-projects/get-single-project`,
    getRootDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/get-root-directory`,
    addFileToDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/add-file-to-directory`,
    getFilesFromDirectory: `${environment.composeBaseUrl()}/api/v1/code-projects/get-directory-files`,
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

  getRootDirectory(codeProjectUuid: string): string {
    return `${this.routes.getRootDirectory}/${codeProjectUuid}`;
  }

  addFileToDirectory(): string {
    return `${this.routes.addFileToDirectory}`;
  }

  getFilesFromDirectory(directoryId: string): string {
    return `${this.routes.getFilesFromDirectory}/${directoryId}`;
  }
}