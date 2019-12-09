import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/RouteResolver";
import {reduce} from "rxjs/operators";
import {FileHttpModel} from "../model/http/codeEditor/FileHttpModel";
import {IRequestModel} from "../model/IRequestModel";

@Injectable({
  providedIn: 'root',
})
export class FileRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
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
}
