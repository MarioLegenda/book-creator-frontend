import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class BlogRoutesResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    createBlankBlog: `${this.bookApiUri}/api/v1/knowledge-source/create/blank-blog`,
  };

  createBlankBlog() {
      return this.routes.createBlankBlog;
  }
}