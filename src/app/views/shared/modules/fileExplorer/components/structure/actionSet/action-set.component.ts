import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
} from '@angular/core';
@Component({
  selector: 'cms-action-set',
  styleUrls: [
    '../global-actions.component.scss',
    './action-set.component.scss',
  ],
  templateUrl: './action-set.component.html',
})
export class ActionSetComponent implements OnChanges, OnInit {
  expanded: boolean = false;
  expandClassDeterminator: number;

  @Output('onActionEditEvent') onActionEditEvent = new EventEmitter();
  @Output('onActionDeleteEvent') onActionDeleteEvent = new EventEmitter();
  @Output('onActionAddFileEvent') onActionAddFileEvent = new EventEmitter();
  @Output('onActionAddDirectoryEvent') onActionAddDirectoryEvent = new EventEmitter();
  @Output('onActionCopyEvent') onActionCopyEvent = new EventEmitter();
  @Output('onActionPasteEvent') onActionPasteEvent = new EventEmitter();

  @Input('externalExpand') externalExpand: boolean = false;
  @Input('showEdit') showEdit: boolean = false;
  @Input('showDelete') showDelete: boolean = false;
  @Input('showAddFile') showAddFile: boolean = false;
  @Input('showAddDirectory') showAddDirectory: boolean = false;
  @Input('showCopy') showCopy: boolean = false;
  @Input('showPaste') showPaste: boolean = false;

  @Input('rightWidth') rightWidth: string;

  ngOnInit() {
    this.expandClassDeterminator = this.determineExpandClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showPaste'] && !changes.showPaste.firstChange) {
      this.expandClassDeterminator = this.determineExpandClass();
    } else if (changes['externalExpand'] && !changes.externalExpand.firstChange) {
      this.expanded = !this.expanded;
    }
  }

  onExpand($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.expanded = !this.expanded;
  }

  onNotPropagate($event): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onActionCopy($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionCopyEvent.emit();
  }

  onActionEdit($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionEditEvent.emit();
  }

  onActionDelete($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionDeleteEvent.emit();
  }

  onActionAddFile($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionAddFileEvent.emit();
  }

  onActionAddDirectory($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionAddDirectoryEvent.emit();
  }

  onActionPaste($event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.onActionPasteEvent.emit();
  }

  private determineExpandClass(): number {
    const fields = ['showEdit', 'showDelete', 'showAddFile', 'showAddDirectory', 'showCopy', 'showPaste'];

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
