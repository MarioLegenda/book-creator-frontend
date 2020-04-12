import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
@Component({
  selector: 'cms-action-set',
  styleUrls: [
    '../global-actions.component.scss',
    './action-set.component.scss',
  ],
  templateUrl: './action-set.component.html',
})
export class ActionSetComponent {
  expanded: boolean = false;
  expandClassDeterminator: number;

  @Output('onActionEditEvent') onActionEditEvent = new EventEmitter();
  @Output('onActionDeleteEvent') onActionDeleteEvent = new EventEmitter();
  @Output('onActionAddFileEvent') onActionAddFileEvent = new EventEmitter();
  @Output('onActionAddDirectoryEvent') onActionAddDirectoryEvent = new EventEmitter();

  @Input('showEdit') showEdit: boolean = false;
  @Input('showDelete') showDelete: boolean = false;
  @Input('showAddFile') showAddFile: boolean = false;
  @Input('showAddDirectory') showAddDirectory: boolean = false;

  @Input('rightWidth') rightWidth: string;

  ngOnInit() {
    this.expandClassDeterminator = this.determineExpandClass();

    console.log(this.expandClassDeterminator);
  }

  onExpand($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.expanded = !this.expanded;
  }

  onNotPropagate($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onActionEdit($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionEditEvent.emit();
  }

  onActionDelete($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionDeleteEvent.emit();
  }

  onActionAddFile($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionAddFileEvent.emit();
  }

  onActionAddDirectory($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionAddDirectoryEvent.emit();
  }

  private determineExpandClass(): number {
    const fields = ['showEdit', 'showDelete', 'showAddFile', 'showAddDirectory'];

    let count: number = 0;
    for (const f of fields) {
      if (this[f]) {
        count++;
      }
    }

    if (count === 0) {
      throw new Error(`At least one action is required to make ActionSet work`);
    }

    return count;

  }
}
