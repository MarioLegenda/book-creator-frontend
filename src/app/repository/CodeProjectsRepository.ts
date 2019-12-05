import {Injectable} from "@angular/core";
import {IRequestModel} from "../model/http/IRequestModel";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/RouteResolver";
import {reduce} from "rxjs/operators";
import {TextBlockModel} from "../model/http/TextBlockModel";
import {CodeProjectModel} from "../model/http/CodeProjectModel";

@Injectable({
  providedIn: 'root',
})
export class CodeProjectsRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  createCodeProject(model: IRequestModel) {
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

          const result: CodeProjectModel[] = [];

          for (const entry of data) {
            result.push(new CodeProjectModel(
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
