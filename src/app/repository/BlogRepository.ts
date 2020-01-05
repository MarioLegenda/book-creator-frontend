import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BlogRoutesResolver} from '../logic/routes/BlogRoutesResolver';

@Injectable({
  providedIn: 'root',
})
export class BlogRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: BlogRoutesResolver,
  ) {}

  createBlankBlog() {
    return this.httpClient.put(this.routeResolver.createBlankBlog(), {});
  }

  getUuid(shortId: string) {
    return this.httpClient.get(this.routeResolver.getUuid(shortId));
  }

  getBlog(uuid: string) {
    return this.httpClient.get(this.routeResolver.getBlog(uuid));
  }
}
