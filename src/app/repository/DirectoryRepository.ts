import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";
import {reduce} from "rxjs/operators";

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
          const modelFactory = function modelFactory(codeProjectUuid, originalModel) {
            return Object.assign({}, {
              codeProjectUuid: codeProjectUuid,
              type: 'directory',
            }, originalModel);
          };

          return {
            factory: modelFactory,
            originalModel: res.data,
          }
        }, {})
      )
  }

  getSubdirectories(codeProjectUuid: string, directoryId: string) {
    return this.httpClient.get(this.routeResolver.getSubdirectories(codeProjectUuid, directoryId))
      .pipe(
        reduce((acc, res: any) => {
          const modelFactory = function modelFactory(codeProjectUuid, originalModel) {
            const directoryModels = [];
            for (const dir of originalModel) {
              directoryModels.push(Object.assign({}, {
                codeProjectUuid: codeProjectUuid,
                type: 'directory',
              }, dir));
            }

            return directoryModels;
          };

          return {
            factory: modelFactory,
            originalModel: res.data,
          };
        }, {})
      )
  }

  createDirectory(model) {
    return this.httpClient.put(this.routeResolver.createDirectory(), model)
      .pipe(
        reduce(((acc, res: any) => {
          const modelFactory = function modelFactory(codeProjectUuid, originalModel) {
            return Object.assign({}, {
              codeProjectUuid: codeProjectUuid,
              type: 'directory',
            }, originalModel);
          };

          return {
            factory: modelFactory,
            originalModel: res.data,
          }
        }), {})
      );
  }

  removeDirectory(codeProjectUuid: string, directoryId: string) {
    return this.httpClient.post(this.routeResolver.removeDirectory(), {
      data: {
        codeProjectUuid: codeProjectUuid,
        directoryId: directoryId,
      },
    });
  }

  renameDirectory(model) {
    return this.httpClient.post(this.routeResolver.renameDirectory(), model);
  }
}
