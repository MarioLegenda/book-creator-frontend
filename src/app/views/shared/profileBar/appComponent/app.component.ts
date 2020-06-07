import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {AccountProvider} from "../../../../logic/AccountProvider";
import {Account} from "../../../../model/app/Account";
import {DOCUMENT} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {createBlog} from "../../../../library/helpers";
import {NavigationEnd, Router} from "@angular/router";
import {PageRepository} from "../../../../repository/PageRepository";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {select, Store} from "@ngrx/store";
import {actionTypes} from "../../../../store/account/actions";

@Component({
  selector: 'app-profile-bar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account: Account;
  isBlogPage: boolean = false;

  name = '';
  lastName = '';
  email = '';
  avatar = '';

  @ViewChild('mainMenuRef', {static: true}) mainMenuRef: ElementRef;

  constructor(
    private accountProvider: AccountProvider,
    @Inject(DOCUMENT) private document: Document,
    private matDialog: MatDialog,
    private router: Router,
    private pageRepository: PageRepository,
    private blogRepository: BlogRepository,
    private store: Store<any>,
  ) {
    this.account = accountProvider.getAccount();
  }

  ngOnInit() {
    const avatar = this.account.profile.avatar;
    this.avatar = avatar.path;

    this.name = this.account.name;
    this.lastName = this.account.lastName;

    this.store.pipe(select('accountActions')).subscribe((action) => {
      if (!action) return;

      switch(action.type) {
        case actionTypes.AVATAR_CHANGED: {
          this.account = this.accountProvider.getAccount();

          const avatar = this.account.profile.avatar;
          this.avatar = avatar.path;

          break;
        }

        case actionTypes.BASIC_INFO_CHANGED: {
          const account = this.accountProvider.getAccount();

          this.name = account.name;
          this.lastName = account.lastName;
        }
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const re = new RegExp('/page/blog/');
        if (re.test(event.url)) {
          this.isBlogPage = true;
        }
      }
    });
  }

  onShowMenu() {
    const style = this.mainMenuRef.nativeElement.style;

    if (style.display === 'none') {
      this.mainMenuRef.nativeElement.style = 'display: block';
    } else if (style.display === 'block') {
      this.mainMenuRef.nativeElement.style = 'display: none';
    }
  }

  onOverview() {
    this.mainMenuRef.nativeElement.style = 'display: none';

    this.router.navigate(['/cms/management/blogs/list']);
  }

  onHome() {
    this.document.location.href = '/';
  }

  onSignOut(): void {
    this.accountProvider.logout();

    window.location.href = '/';
  }

  onProfile(): void {
    this.mainMenuRef.nativeElement.style = 'display: none';

    this.router.navigate(['/cms/management/user-section/profile']);
  }

  onBlogs(): void {
    this.mainMenuRef.nativeElement.style = 'display: none';

    this.router.navigate(['/cms/management/blogs/list']);
  }

  onCodeProjects(): void {
    this.mainMenuRef.nativeElement.style = 'display: none';

    this.router.navigate(['/cms/management/code-projects/list']);
  }

  onNewBlog() {
    if (this.isBlogPage) {
      this.mainMenuRef.nativeElement.style = 'display: none';

      return;
    }

    this.mainMenuRef.nativeElement.style = 'display: none';

    createBlog(this.router, this.matDialog, this.pageRepository, this.blogRepository);
  }
}
