import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/routes/RouteResolver";
import {reduce} from "rxjs/operators";
import {CodeProjectHttpModel} from "../model/http/codeEditor/CodeProjectHttpModel";

@Injectable({
  providedIn: 'root',
})
export class CodeProjectsRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  createCodeProject(model) {
    return this.httpClient.put(this.routeResolver.createCodeProject(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  getBySource(sourceId: string, size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getProjectsBySource(sourceId, size, page));
  }

  getProjects(size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getProjects(size, page))
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }
}
