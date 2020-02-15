import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {reduce} from "rxjs/operators";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";

@Injectable({
  providedIn: 'root',
})
export class FileRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver
  ) {}

  public addFileToDirectory(model) {
    return this.httpClient.put(this.routeResolver.addFileToDirectory(), model)
      .pipe(
        reduce((acc, res: any) => {
          const modelFactory = function modelFactory(codeProjectUuid, originalModel) {
            return Object.assign({}, {
              codeProjectUuid: codeProjectUuid,
              type: 'file',
            }, originalModel);
          };

          return {
            factory: modelFactory,
            originalModel: res.data,
          };
        }, {})
      )
  }

  public removeFileById(model) {
    return this.httpClient.post(this.routeResolver.removeFile(), model);
  }

  public getFilesFromDirectory(codeProjectUuid: string, directoryId: string) {
    return this.httpClient.get(this.routeResolver.getFilesFromDirectory(codeProjectUuid, directoryId))
      .pipe(
        reduce((acc, res: any) => {
          const modelFactory = function modelFactory(codeProjectUuid, originalModel) {
            const models = [];
            for (const file of originalModel) {
              models.push(Object.assign({}, {
                codeProjectUuid: codeProjectUuid,
                type: 'file',
              }, file));
            }

            return models;
          };

          return {
            factory: modelFactory,
            originalModel: res.data,
          };
        }, {})
      );
  }

  public getFileContent(codeProjectUuid: string, fileId: string) {
    return this.httpClient.get(this.routeResolver.getFileContent(codeProjectUuid, fileId));
  }

  public updateFileContent(codeProjectUuid: string, fileId: string, content: string) {
    return this.httpClient.post(this.routeResolver.updateFileContent(), {
      data: {
        codeProjectUuid: codeProjectUuid,
        fileId: fileId,
        content: content,
      },
    });
  }

  public renameFile(model) {
    return this.httpClient.post(this.routeResolver.renameFile(), model);
  }
}
