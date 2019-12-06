import {Component} from '@angular/core';

@Component({
  selector: 'cms-overview-menu',
  styleUrls: [
    './menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  icons = {
    codeProjects: 'fas fa-laptop-code',
    knowledgeSource: 'fas fa-book-open',
  };

  navigateSource() {

  }

  navigateCodeProjects() {

  }
}
