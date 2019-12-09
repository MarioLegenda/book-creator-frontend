import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/RouteResolver";
import {reduce} from "rxjs/operators";
import {DirectoryHttpModel} from "../model/http/codeEditor/DirectoryHttpModel";

@Injectable({
  providedIn: 'root',
})
export class DirectoryRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
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
}
