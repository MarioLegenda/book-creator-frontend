import {Injectable} from "@angular/core";
import {Account} from "../model/app/Account";
import {CookieService} from "ngx-cookie-service";
import {AccountRepository} from "../repository/AccountRepository";
import {HttpModel} from "../model/http/HttpModel";
import {ReplaySubject, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AccountProvider {
  private account: Account = null;

  private readonly accountLoader: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(
    private cookie: CookieService,
    private accountRepository: AccountRepository,
  ) {}

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

  subscribe(cb) {
    return this.accountLoader.subscribe(cb);
  }

  loadAccount() {
    const token = this.cookie.get('token');

    this.accountRepository.verifyAccount(HttpModel.verifyAccount(token)).subscribe((account) => {
      this.account = account;

      this.accountLoader.next(this.account);
    });
  }
}
