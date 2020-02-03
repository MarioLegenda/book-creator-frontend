import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  httpCreateCodeBlock, httpCreateMainHeader,
  httpCreateMultimediaBlock, httpCreateSubheader,
  httpCreateTextBlock, httpUpdateBlockPosition,
} from 'src/app/store/page/httpActions';
import {Store} from '@ngrx/store';
import {addPosition} from "../../../logic/utilFns";
import {TextBlockModel} from "../../../model/app/TextBlockModel";
import {ComponentType} from "../../../logic/PageComponent/ComponentType";
import {CodeBlockModel} from "../../../model/app/CodeBlockModel";
import {Subject} from "rxjs";
import {AppContext} from "../../../logic/PageComponent/context/AppContext";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {MultimediaBlockModel} from "../../../model/app/MultimediaBlockModel";
import {MainHeaderBlock} from "../../../model/app/MainHeaderBlock";
import {SubheaderBlock} from "../../../model/app/SubheaderBlock";

@Component({
  selector: 'cms-work-area',
  styleUrls: [
    './work-area.component.scss',
    './blog-specific.component.scss',
  ],
  templateUrl: './work-area.component.html',
})
export class WorkAreaComponent implements OnInit, OnDestroy {
  components = [];

  droppedSubject = new Subject();

  sourceContext: AppContext;

  // @ts-ignore
  @ViewChild('workAreaRef') workAreaRef: ElementRef;

  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker,
    private appContextInitializer: AppContextInitializer
  ) {}

  ngOnInit(): void {
    const h = document.body.offsetHeight;
    this.workAreaRef.nativeElement.setAttribute('style', `min-height: ${h}px`);

    this.componentTracker.componentSubscribe((component) => {
      addPosition(component, this.components);

      if (ComponentType.isTextBlock(component)) {
        this.components.push(new TextBlockModel(
          component.uuid,
          component.shortId,
          component.text,
          component.position,
          component.internalName,
          component.comment,
        ));
      } else if (ComponentType.isCodeBlock(component)) {
        this.components.push(new CodeBlockModel(
          component.uuid,
          component.shortId,
          component.text,
          component.readonly,
          component.isGist,
          component.isCode,
          component.gistData,
          component.emulator,
          component.codeProjectUuid,
          component.position,
          component.internalName,
          component.comment,
        ));
      } else if (ComponentType.isMultimediaBlock(component)) {
        this.components.push(new MultimediaBlockModel(
          component.uuid,
          component.shortId,
          component.fileInfo,
          component.unsplash,
          component.position,
        ));
      } else if (ComponentType.isMainHeaderBlock(component)) {
        this.components.push(new MainHeaderBlock(
          component.uuid,
          component.shortId,
          component.text,
          component.position,
        ));
      } else if (ComponentType.isSubheaderBlock(component)) {
        this.components.push(new SubheaderBlock(
          component.uuid,
          component.shortId,
          component.text,
          component.position,
        ));
      }
    });

    this.componentTracker.positionSubscribe((position) => {
      const idx = this.components.findIndex(val => val.position === position);

      this.components.splice(idx, 1);
    });

    this.appContextInitializer.whenInit((sourceContext: AppContext) => {
      this.sourceContext = sourceContext;
    })
  }

  ngOnDestroy() {
    this.componentTracker.destroy();
    this.components = [];
  }

  onBlockAdded(type: string) {
    switch (type) {
      case 'text-block': {
        this.store.dispatch(httpCreateTextBlock({position: this.componentTracker.getNextPosition()}));

        break;
      }

      case 'code-block': {
        this.store.dispatch(httpCreateCodeBlock({position: this.componentTracker.getNextPosition()}));

        break;
      }

      case 'multimedia-block': {
        this.store.dispatch(httpCreateMultimediaBlock({position: this.componentTracker.getNextPosition()}));

        break;
      }

      case 'main-header': {
        this.store.dispatch(httpCreateMainHeader({position: this.componentTracker.getNextPosition()}));

        break;
      }

      case 'subheader': {
        this.store.dispatch(httpCreateSubheader({position: this.componentTracker.getNextPosition()}));

        break;
      }
    }
  }

  onDropped(component) {
    this.droppedSubject.next(component.blockUuid);
  }

  drop(event: CdkDragDrop<any>) {
    const previous: any = this.components[event.previousIndex];
    const current: any = this.components[event.currentIndex];

    const temp = previous.position;
    previous.position = current.position;
    current.position = temp;

    this.store.dispatch(httpUpdateBlockPosition({
      pageUuid: this.sourceContext.page.uuid,
      blockUuid: previous.blockUuid,
      position: previous.position,
    }));

    this.store.dispatch(httpUpdateBlockPosition({
      pageUuid: this.sourceContext.page.uuid,
      blockUuid: current.blockUuid,
      position: current.position,
    }));

    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }
}
