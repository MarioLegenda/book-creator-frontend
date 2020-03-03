import {Injectable} from "@angular/core";
import {Account} from "../model/app/Account";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class AccountProvider {
  private account: Account = null;

  constructor(
    private cookie: CookieService,
  ) {
    this.loadAccount();
  }

  getAccount(): Account {
    return this.account;
  }

  updateProfileAvatar(avatar): void {
    const unparsed = JSON.parse(this.cookie.get('loggedInAccount'));

    unparsed['profile'].avatar = avatar;

    this.cookie.set('loggedInAccount', JSON.stringify(unparsed), 30, '/');

    this.account.profile.avatar = avatar;
  }

  updateBasicData(name: string, lastName: string) {
    const unparsed = JSON.parse(this.cookie.get('loggedInAccount'));

    unparsed['name'] = name;
    unparsed['lastName'] = lastName;

    this.cookie.set('loggedInAccount', JSON.stringify(unparsed), 30, '/');

    this.loadAccount();
  }

  updateProfile(
    githubProfile: string,
    personalWebsite: string,
    company: string,
    openSourceProject: string,
  ) {
    const unparsed = JSON.parse(this.cookie.get('loggedInAccount'));

    const profile = unparsed.profile;

    profile['githubProfile'] = githubProfile;
    profile['personalWebsite'] = personalWebsite;
    profile['company'] = company;
    profile['openSourceProject'] = openSourceProject;

    this.cookie.set('loggedInAccount', JSON.stringify(unparsed), 30, '/');

    this.loadAccount();
  }

  clearAccount() {
    this.cookie.delete('loggedInAccount', '/');

    this.account = null;
  }

  private loadAccount() {
    if (this.cookie.check('loggedInAccount')) {
      const unparsed = JSON.parse(this.cookie.get('loggedInAccount'));

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
        unparsed['profile'],
      );
    }
  }
}
