import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountRouteResolver} from "../logic/routes/AccountRouteResolver";
import {reduce} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AccountRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: AccountRouteResolver,
  ) {}

  updateAccount(model) {
    return this.httpClient.post(this.routeResolver.updateAccount(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }

  verifyAccount(model) {
    return this.httpClient.post(this.routeResolver.verifyAccount(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }
}
