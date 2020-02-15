import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";
import {reduce} from "rxjs/operators";

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
    private routeResolver: CodeEditorRouteResolver
  ) {}

  getRootDirectory(codeProjectUuid: string) {
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

  getSubdirectories(codeProjectUuid: string, directoryId: string) {
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

  createDirectory(model) {
    return this.httpClient.put(this.routeResolver.createDirectory(), model)
      .pipe(
        reduce(((acc, res: any) => {
          return {
            factory: singleDirectoryFactory,
            originalModel: res.data,
          }
        }), {})
      );
  }

  removeDirectory(model) {
    return this.httpClient.post(this.routeResolver.removeDirectory(), model);
  }

  renameDirectory(model) {
    return this.httpClient.post(this.routeResolver.renameDirectory(), model);
  }
}
