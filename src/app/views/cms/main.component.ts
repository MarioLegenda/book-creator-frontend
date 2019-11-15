import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageContextService} from "../../logic/PageComponent/context/PageContextService";

@Component({
  selector: 'cms-component',
  styleUrls: ['../../web/styles/cms.component.scss'],
  templateUrl: '../../web/templates/cms/cms.component.html',
})
export class MainComponent {
  constructor(
    activatedRoute: ActivatedRoute,
    pageContext: PageContextService
  ) {
    pageContext.initContext(activatedRoute);
  }
}
