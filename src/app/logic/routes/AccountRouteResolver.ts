import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AccountRouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    updateAccount: `${this.bookApiUri}/api/v1/security/update-account`,
    verifyAccount: `${this.bookApiUri}/api/v1/security/verify-account`,
  };

  updateAccount(): string {
    return this.routes.updateAccount;
  }

  verifyAccount(): string {
    return this.routes.verifyAccount;
  }
}
