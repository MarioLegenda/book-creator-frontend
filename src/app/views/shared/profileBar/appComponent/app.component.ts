import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {AccountProvider} from "../../../../logic/AccountProvider";
import {Account} from "../../../../model/app/Account";
import {DOCUMENT} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {createBlog} from "../../../../library/helpers";
import {NavigationEnd, Router} from "@angular/router";
import {PageRepository} from "../../../../repository/PageRepository";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {NewCodeProjectDialogComponent} from "../../modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {HttpModel} from "../../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";

@Component({
  selector: 'app-profile-bar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account: Account;
  isBlogPage: boolean = false;

  displayName = '';
  email = '';
  // @ts-ignore
  @ViewChild('mainMenuRef') mainMenuRef: ElementRef;

  constructor(
    private accountProvider: AccountProvider,
    @Inject(DOCUMENT) private document: Document,
    private matDialog: MatDialog,
    private router: Router,
    private pageRepository: PageRepository,
    private blogRepository: BlogRepository,
  ) {
    this.account = accountProvider.getAccount();
  }

  ngOnInit() {
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

    this.router.navigate(['/cms/management']);
  }

  onHome() {
    this.document.location.href = '/';
  }

  onSignOut() {
    this.accountProvider.clearAccount();

    this.document.location.href = '/';
  }

  onNewBlog() {
    if (this.isBlogPage) {
      this.mainMenuRef.nativeElement.style = 'display: none';

      return;
    }

    this.mainMenuRef.nativeElement.style = 'display: none';

    createBlog(this.router, this.matDialog, this.pageRepository, this.blogRepository);
  }

  private createBasicInfo() {
    const max = 30;
    const displayName = `${this.account.name} ${this.account.lastName}`;

    if (displayName.length > max) {
      this.displayName = displayName.substring(0, max);
    }

    const email = this.account.email;

    if (email.length > max) {
      this.email = email.substring(0, max);
    }
  }
}
