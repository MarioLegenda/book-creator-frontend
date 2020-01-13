import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpCreateCodeBlock, httpCreateTextBlock} from "../../../store/page/httpActions";
import {Router} from "@angular/router";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {PositionMap} from "../../../logic/PageComponent/PositionMap";

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(
    private store: Store<{menu: string}>,
    private pageContext: AppContextInitializer,
    private router: Router,
  ) {}

  @Output('blockAddedEvent') blockAddedEvent: EventEmitter<any> = new EventEmitter();

  icons = {
    'menu': 'fas fa-bars',
    'paragraph': 'fas fa-paragraph',
    'image': 'fas fa-image',
    'multimedia': 'fas fa-photo-video',
    'code': 'fas fa-code',
    'footnote': 'fas fa-file',
    'dynamicForms': 'fab fa-wpforms',
    'codeProjects': 'fas fa-laptop-code',
  };

  menuExpanded = false;

  appendTextBlock() {
    this.blockAddedEvent.emit('text-block');
  }

  appendCodeBlock() {
    this.blockAddedEvent.emit('code-block');
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  navigateToCodeProjects() {
    const type: string = this.pageContext.getContext().knowledgeSource.type;
    const sourceShortId = this.pageContext.getContext().knowledgeSource.shortId;

    this.router.navigate(['/cms/overview/code-projects', type, sourceShortId]);
  }
}
