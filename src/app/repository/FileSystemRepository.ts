import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "./routeResolvers/CodeEditorRouteResolver";
import {map} from "rxjs/operators";
import {ProjectRouteResolver} from "./routeResolvers/ProjectRouteResolver";
import {IResponse} from "../model/http/response/IResponse";

function singleDirectoryFactory(codeProjectUuid, originalModel) {
  return Object.assign({}, {
    codeProjectUuid: codeProjectUuid,
    type: 'directory',
  }, originalModel);
}

function directoryCollectionFactory(codeProjectUuid, originalModel) {
  const directoryModels = [];
  for (const dir of originalModel) {
    directoryModels.push(Object.assign({}, {
      codeProjectUuid: codeProjectUuid,
      type: 'directory',
    }, dir));
  }

  return directoryModels;
}

@Injectable({
  providedIn: 'root',
})
export class FileSystemRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver,
    private projectRouteResolver: ProjectRouteResolver,
  ) {}

  getRootDirectory(codeProjectUuid: string): any {
    return this.httpClient.get<IResponse>(this.routeResolver.getRootDirectory(codeProjectUuid))
      .pipe(
        map((res: IResponse) => {
          return {
            factory: singleDirectoryFactory,
            originalModel: res.data,
          }
        })
      )
  }

  getSubdirectories(codeProjectUuid: string, directoryId: string): any {
    return this.httpClient.get<IResponse>(this.routeResolver.getSubdirectories(codeProjectUuid, directoryId))
      .pipe(
        map((res: IResponse) => {
          return {
            factory: directoryCollectionFactory,
            originalModel: res.data,
          };
        })
      )
  }

  async createDirectory(model) {
    try {
      const response: IResponse = await this.httpClient.put<IResponse>(this.routeResolver.createDirectory(), model).toPromise();
      return {
        factory: singleDirectoryFactory,
        originalModel: response.data,
      };
    } catch (e) {
      return {
        error: e.error,
      }
    }
  }

  removeDirectory(model) {
    return this.httpClient.post<IResponse>(this.routeResolver.removeDirectory(), model);
  }

  async renameDirectory(model) {
    try {
      const response: IResponse = await this.httpClient.post<IResponse>(this.routeResolver.renameDirectory(), model).toPromise();
      return {
        factory: singleDirectoryFactory,
        originalModel: response.data,
      };
    } catch (e) {
      return {
        error: e.error,
      }
    }
  }

  searchDirsAndFiles(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.searchDirsAndFiles(), model)
      .pipe(
        map((res: IResponse) => {
          const data = res.data;
          data.isEmpty = data.directories.length === 0 && data.files.length === 0;

          return data;
        })
      )
  }

  cutFile(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.cutFile(), model)
      .pipe(
        map((res: IResponse) => res.data)
      )
  }

  copyFile(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.copyFile(), model)
      .pipe(
        map((res: any) => res.data)
      )
  }

  cutDirectory(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.cutDirectory(), model)
      .pipe(
        map((res: IResponse) => res.data)
      )
  }

  copyDirectory(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.copyDirectory(), model)
      .pipe(
        map((res: IResponse) => res.data)
      )
  }
}
