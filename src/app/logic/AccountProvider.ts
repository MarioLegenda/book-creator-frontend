import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Account} from "../model/app/Account";

@Injectable({
  providedIn: 'root',
})
export class AccountProvider {
  private readonly account: Account = null;

  constructor(
    private cookie: CookieService,
  ) {
    if (cookie.check('loggedInAccount')) {
      const unparsed = JSON.parse(cookie.get('loggedInAccount'));

      this.account = new Account(
        unparsed['type'],
        unparsed['name'],
        unparsed['lastName'],
        unparsed['email'],
        unparsed['provider'],
        unparsed['confirmed'],
        unparsed['shortId'],
        unparsed['uuid'],
        unparsed['token'],
      );
    }
  }

  getAccount(): Account {
    return this.account;
  }

  clearAccount() {
    this.cookie.delete('loggedInAccount', '/');
  }
}
