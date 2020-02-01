import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";

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
    'header1': 'fas fa-heading',
  };

  menuExpanded = false;

  appendTextBlock() {
    this.blockAddedEvent.emit('text-block');
  }

  appendMainHeader() {
    this.blockAddedEvent.emit('main-header');
  }

  appendSubHeader() {
    this.blockAddedEvent.emit('subheader');
  }

  appendCodeBlock() {
    this.blockAddedEvent.emit('code-block');
  }

  appendMultimediaBlock() {
    this.blockAddedEvent.emit('multimedia-block');
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  navigateToCodeProjects() {
    this.router.navigate(['/cms/managment/overview/code-projects']);
  }
}
