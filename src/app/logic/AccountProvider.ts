import {Injectable} from "@angular/core";
import {Account} from "../model/app/Account";
import {CookieService} from "ngx-cookie-service";
import {AccountRepository} from "../repository/AccountRepository";
import {HttpModel} from "../model/http/HttpModel";

@Injectable({
  providedIn: 'root',
})
export class AccountProvider {
  private account: Account = null;

  constructor(
    private cookie: CookieService,
    private accountRepository: AccountRepository,
  ) {

  }

  getAccount(): Account {
    return this.account;
  }

  hasAccount(): boolean {
    return !!(this.account);
  }

  isLoggedIn(): boolean {
    return !!(this.cookie.get('token'));
  }

  logout() {
    this.cookie.delete('token', '/');

    this.account = null;
  }

  async loadAccount() {
    const token = this.cookie.get('token');

    this.account = await this.accountRepository.verifyAccount(HttpModel.verifyAccount(token)).toPromise();
  }
}
