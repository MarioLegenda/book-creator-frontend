import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FileUploadRouteResolver} from "../logic/routes/FileUploadRouteResolver";
import {reduce} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class FileUploadRepository {
  constructor(
    private httpClient: HttpClient,
    private rebelCdnRouteResolver: FileUploadRouteResolver
  ) {}

  uploadFile(model) {
    return this.httpClient.put(this.rebelCdnRouteResolver.uploadFile(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }
}
