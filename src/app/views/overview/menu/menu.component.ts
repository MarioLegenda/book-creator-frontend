import {Component} from '@angular/core';
import {faBookOpen, faLaptopCode} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'cms-overview-menu',
  styleUrls: [
    './menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  icons = {
    codeProjects: faLaptopCode,
    knowledgeSource: faBookOpen,
  };

  navigateSource() {

  }

  navigateCodeProjects() {

  }
}
