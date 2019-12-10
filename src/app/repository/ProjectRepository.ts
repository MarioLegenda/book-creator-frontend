import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/routes/RouteResolver";
import {concatMap, reduce} from "rxjs/operators";
import {CodeProjectHttpModel} from "../model/http/codeEditor/CodeProjectHttpModel";

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  getProjectByShortId(shortId: string) {
    return this.httpClient.get(this.routeResolver.getProjectUuidByShortId(shortId))
      .pipe(
        concatMap((val: any) => {
          return this.httpClient.get(this.routeResolver.getSingleProject(val.data));
        })
      ).pipe(
        reduce((acc, res: any) => {
          const data = (res as any).data;

          return new CodeProjectHttpModel(
            data.uuid,
            data.shortId,
            data.sourceId,
            data.name,
            data.description,
          )
        }, {})
      );
  }

  getProjectByUuid(uuid: string) {
    return this.httpClient.get(this.routeResolver.getSingleProject(uuid));
  }
}
