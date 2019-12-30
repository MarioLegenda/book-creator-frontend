import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class EnvironmentEmulatorRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver
  ) {}

  public BuildAndRunProject(codeProjectUuid: string, content: string) {
    return this.httpClient.post(this.routeResolver.runProject(codeProjectUuid), {
      data: content,
    });
  }
}
