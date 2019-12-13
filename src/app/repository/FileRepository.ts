import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {reduce} from "rxjs/operators";
import {FileHttpModel} from "../model/http/codeEditor/FileHttpModel";
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
          const data = res.data;

          return new FileHttpModel(
            'file',
            data.name,
            data.id,
            data.directoryId,
            data.content,
          );
        }, {})
      )
  }

  public removeFileById(model) {
    return this.httpClient.post(this.routeResolver.removeFile(), model);
  }

  public getFilesFromDirectory(directoryId: string) {
    return this.httpClient.get(this.routeResolver.getFilesFromDirectory(directoryId))
      .pipe(
        reduce((acc, res: any) => {
          const files = res.data;

          const fileModels: FileHttpModel[] = [];
          for (const file of files) {
            fileModels.push(new FileHttpModel(
              'file',
              file.name,
              file.id,
              file.directoryId,
              file.content,
            ));
          }

          return fileModels;
        }, {})
      );
  }

  public getFileContent(fileId: string) {
    return this.httpClient.get(this.routeResolver.getFileContent(fileId));
  }

  public updateFileContent(fileId: string, content: string) {
    return this.httpClient.post(this.routeResolver.updateFileContent(), {
      data: {
        fileId: fileId,
        content: content,
      },
    })
  }
}
