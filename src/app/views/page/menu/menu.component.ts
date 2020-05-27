import {Component, EventEmitter, Output} from '@angular/core';
import {RemoveConfirmDialogComponent} from "../modals/removeConfirm/remove-confirm-modal.component";
import {httpRemoveBlock} from "../../../store/page/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {MainHelpModalComponent} from "../modals/mainHelp/main-help-modal.component";

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private dialog: MatDialog) {}

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
    'help': 'fas fa-question-circle',
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

  viewHelp() {
    this.dialog.open(MainHelpModalComponent, {
      width: '70%',
      data: {
        path: location.pathname,
      },
    });
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }
}
