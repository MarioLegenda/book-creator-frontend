import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";
import {reduce} from "rxjs/operators";
import {DirectoryHttpModel} from "../model/http/codeEditor/DirectoryHttpModel";

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
          const data = res.data;

          return new DirectoryHttpModel(
            data.id,
            data.name,
            data.isRoot,
            data.codeProjectUuid,
            data.depth,
            data.parent,
          )
        }, {})
      )
  }

  getSubdirectories(directoryId: string) {
    return this.httpClient.get(this.routeResolver.getSubdirectories(directoryId))
      .pipe(
        reduce((acc, res: any) => {
          const data = res.data;

          const directoryHttpModels: DirectoryHttpModel[] = [];
          for (const dir of data) {
            directoryHttpModels.push(new DirectoryHttpModel(
              dir.id,
              dir.name,
              dir.isRoot,
              dir.codeProjectUuid,
              dir.depth,
              dir.parent,
            ));
          }

          return directoryHttpModels;
        }, {})
      )
  }

  createDirectory(model) {
    return this.httpClient.put(this.routeResolver.createDirectory(), model)
      .pipe(
        reduce(((acc, res: any) => {
          const data = res.data;

          return new DirectoryHttpModel(
            data.id,
            data.name,
            data.isRoot,
            data.codeProjectUuid,
            data.depth,
            data.parent,
          );
        }), {})
      );
  }

  removeDirectory(directoryId: string) {
    return this.httpClient.post(this.routeResolver.removeDirectory(), {
      data: {
        directoryId: directoryId,
      },
    });
  }
}
