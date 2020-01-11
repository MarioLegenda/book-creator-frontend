import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {concatMap, reduce} from "rxjs/operators";
import {CodeProjectHttpModel} from "../model/http/codeEditor/CodeProjectHttpModel";
import {ProjectRouteResolver} from "../logic/routes/ProjectRouteResolver";

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository {
  constructor(
    private httpClient: HttpClient,
    private projectRouteResolver: ProjectRouteResolver,
  ) {}

  getProjectByShortId(shortId: string) {
    return this.httpClient.get(this.projectRouteResolver.getProjectUuidByShortId(shortId))
      .pipe(
        concatMap((val: any) => {
          return this.httpClient.get(this.projectRouteResolver.getSingleProject(val.data));
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
    return this.httpClient.get(this.projectRouteResolver.getSingleProject(uuid));
  }
}
