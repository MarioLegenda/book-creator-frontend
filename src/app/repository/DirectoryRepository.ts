import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "./routeResolvers/CodeEditorRouteResolver";
import {reduce} from "rxjs/operators";
import {ProjectRouteResolver} from "./routeResolvers/ProjectRouteResolver";

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
export class DirectoryRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver,
    private projectRouteResolver: ProjectRouteResolver,
  ) {}

  getRootDirectory(codeProjectUuid: string): any {
    return this.httpClient.get(this.routeResolver.getRootDirectory(codeProjectUuid))
      .pipe(
        reduce((acc, res: any) => {
          return {
            factory: singleDirectoryFactory,
            originalModel: res.data,
          }
        }, {})
      )
  }

  getSubdirectories(codeProjectUuid: string, directoryId: string): any {
    return this.httpClient.get(this.routeResolver.getSubdirectories(codeProjectUuid, directoryId))
      .pipe(
        reduce((acc, res: any) => {
          return {
            factory: directoryCollectionFactory,
            originalModel: res.data,
          };
        }, {})
      )
  }

  async createDirectory(model) {
    try {
      const response: any = await this.httpClient.put(this.routeResolver.createDirectory(), model).toPromise();

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
    return this.httpClient.post(this.routeResolver.removeDirectory(), model);
  }

  async renameDirectory(model) {
    try {
      const response: any = await this.httpClient.post(this.routeResolver.renameDirectory(), model).toPromise();
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
    return this.httpClient.post(this.projectRouteResolver.searchDirsAndFiles(), model)
      .pipe(
        reduce((acc, res: any) => {
          const data = res.data;
          if (data.directories.length === 0 && data.files.length === 0) {
            data.isEmpty = true;
          } else {
            data.isEmpty = false;
          }

          return data;
        }, {}),
      )
  }

  cutFile(model) {
    return this.httpClient.post(this.projectRouteResolver.cutFile(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      )
  }
}
