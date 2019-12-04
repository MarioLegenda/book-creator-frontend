import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {httpCreateCodeBlock, httpCreateTextBlock} from "../../../store/httpActions";
import {Router} from "@angular/router";
import {PageContextInitializer} from "../../../logic/PageComponent/context/PageContextInitializer";
import {
  faParagraph,
  faCode,
  faImage,
  faPhotoVideo,
  faLaptopCode,
  faStickyNote, faFileAlt, faBars
} from "@fortawesome/free-solid-svg-icons";

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

  icons = {
    'paragraph': faParagraph,
    'image': faImage,
    'code': faCode,
    'multimedia': faPhotoVideo,
    'codeProjects': faLaptopCode,
    'footnote': faStickyNote,
    'dynamicForms': faFileAlt,
    'menu': faBars,
  };

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

    this.router.navigate(['/cms/overview', type, sourceShortId]);
  }
}
