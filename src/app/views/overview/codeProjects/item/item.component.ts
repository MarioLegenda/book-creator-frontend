import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cms-code-project-item',
  styleUrls: [
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input('item') item;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  goToEditor() {
    this.router.navigate([
      '/cms/code-editor',
      this.route.snapshot.paramMap.get('sourceShortId'),
    ])
  }
}
