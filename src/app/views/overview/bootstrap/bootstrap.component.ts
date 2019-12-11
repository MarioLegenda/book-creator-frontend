import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cms-code-project-overview',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit {
  componentState = {
    knowledgeSource: {},
    projects: null,
  };

  ngOnInit(): void {

  }
}
