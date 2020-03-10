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

  uploadProfileAvatar(model: any) {
    return this.httpClient.put(this.rebelCdnRouteResolver.uploadProfileAvatar(), model.formData);
  }

  uploadMultimediaBlockImage(model: any) {
    return this.httpClient.put(this.rebelCdnRouteResolver.uploadMultimediaBlockImage(), model.formData)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  deleteMultimediaBlockImage(model: any) {
    return this.httpClient.post(this.rebelCdnRouteResolver.deleteMultimediaBlockImage(), model.formData);
  }
}
