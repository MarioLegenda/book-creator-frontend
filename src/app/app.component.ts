import { Component } from '@angular/core';
import {PageContextService} from "./logic/pageComponent/context/PageContextService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(pageContextService: PageContextService) {}

  title = 'frontend';
}
