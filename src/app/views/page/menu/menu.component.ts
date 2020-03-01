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
  @Output('blockAddedEvent') blockAddedEvent: EventEmitter<any> = new EventEmitter();

  icons = {
    'menu': 'fas fa-bars',
    'paragraph': 'fas fa-paragraph',
    'image': 'fas fa-image',
    'multimedia': 'fas fa-photo-video',
    'code': 'fas fa-code',
    'footnote': 'fas fa-file',
    'dynamicForms': 'fab fa-wpforms',
    'header1': 'fas fa-heading',
    'quote': 'fas fa-quote-right',
  };

  menuExpanded = false;

  appendTextBlock() {
    this.blockAddedEvent.emit('text-block');
  }

  appendMainHeader() {
    this.blockAddedEvent.emit('main-header');
  }

  appendSubheader() {
    this.blockAddedEvent.emit('subheader');
  }

  appendCodeBlock() {
    this.blockAddedEvent.emit('code-block');
  }

  appendMultimediaBlock() {
    this.blockAddedEvent.emit('multimedia-block');
  }

  appendQuoteBlock() {
    this.blockAddedEvent.emit('quote-block');
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }
}
