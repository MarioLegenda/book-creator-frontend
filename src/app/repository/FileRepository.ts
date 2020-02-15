import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {reduce} from "rxjs/operators";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";

function singleFileFactory(codeProjectUuid, originalModel) {
  return Object.assign({}, {
    codeProjectUuid: codeProjectUuid,
    type: 'file',
  }, originalModel);
}

function fileCollectionFactory(codeProjectUuid, originalModel) {
  const models = [];
  for (const file of originalModel) {
    models.push(Object.assign({}, {
      codeProjectUuid: codeProjectUuid,
      type: 'file',
    }, file));
  }

  return models;
}

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
          return {
            factory: singleFileFactory,
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
          return {
            factory: fileCollectionFactory,
            originalModel: res.data,
          };
        }, {})
      );
  }

  public getFileContent(codeProjectUuid: string, fileId: string) {
    return this.httpClient.get(this.routeResolver.getFileContent(codeProjectUuid, fileId));
  }

  public updateFileContent(model) {
    return this.httpClient.post(this.routeResolver.updateFileContent(), model);
  }

  public renameFile(model) {
    return this.httpClient.post(this.routeResolver.renameFile(), model);
  }
}
