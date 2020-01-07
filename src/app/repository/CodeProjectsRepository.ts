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
    return this.httpClient.put(this.routeResolver.createCodeProject(), model);
  }

  getBySource(sourceId: string, size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getProjectsBySource(sourceId, size, page));
  }

  getProjects(size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getProjects(size, page))
      .pipe(
        reduce((acc, res: any) => {
          const data = (res as any).data;

          const result: CodeProjectHttpModel[] = [];

          for (const entry of data) {
            result.push(new CodeProjectHttpModel(
              entry.uuid,
              entry.shortId,
              entry.sourceId,
              entry.name,
              entry.description,
            ));
          }

          return result;
        }, {})
      );
  }
}
