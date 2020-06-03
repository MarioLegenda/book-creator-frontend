import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class FileUploadRouteResolver {
  private cndUri = environment.composeStaticWebUrl();

  private readonly routes = {
    uploadProfileAvatar: `${this.cndUri}/cms/upload-file`,
    uploadMultimediaBlockImage: `${this.cndUri}/page/block/upload-file`,
    deleteMultimediaBlockImage: `${this.cndUri}/page/block/delete-image`,
  };

  uploadProfileAvatar(): string {
    return `${this.routes.uploadProfileAvatar}`;
  }

  uploadMultimediaBlockImage(): string {
    return `${this.routes.uploadMultimediaBlockImage}`;
  }

  deleteMultimediaBlockImage(): string {
    return `${this.routes.deleteMultimediaBlockImage}`;
  }
}
