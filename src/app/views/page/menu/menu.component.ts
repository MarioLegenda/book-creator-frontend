import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {httpCreateCodeBlock, httpCreateTextBlock} from "../../../store/httpActions";
import {ActivatedRoute, Router} from "@angular/router";
import {PageContextInitializer} from "../../../logic/PageComponent/context/PageContextInitializer";

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(
    private store: Store<{menu: string}>,
    private pageContext: PageContextInitializer,
    private router: Router
  ) {}

  menuExpanded = false;

  appendTextBlock() {
    this.store.dispatch(httpCreateTextBlock());
  }

  appendCodeBlock() {
    this.store.dispatch(httpCreateCodeBlock());
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  navigateToCodeProjects() {
    const type: string = this.pageContext.getContext().knowledgeSource.type;
    const sourceShortId = this.pageContext.getContext().knowledgeSource.shortId;

    this.router.navigate(['/cms/code-projects', type, sourceShortId]);
  }
}
