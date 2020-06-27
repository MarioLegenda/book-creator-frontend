import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  httpCreateCodeBlock, httpCreateMainHeader,
  httpCreateMultimediaBlock, httpCreateQuoteBlock, httpCreateSubheader,
  httpCreateTextBlock,
} from 'src/app/store/page/httpActions';
import {Store} from '@ngrx/store';
import {addPosition, changeState} from "../../../logic/utilFns";
import {TextBlockModel} from "../../../model/app/TextBlockModel";
import {ComponentType} from "../../../logic/PageComponent/ComponentType";
import {CodeBlockModel} from "../../../model/app/CodeBlockModel";
import {Subject} from "rxjs";
import {AppContext} from "../../../logic/PageComponent/context/AppContext";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {MultimediaBlockModel} from "../../../model/app/MultimediaBlockModel";
import {MainHeaderBlock} from "../../../model/app/MainHeaderBlock";
import {SubheaderBlock} from "../../../model/app/SubheaderBlock";
import {QuoteBlock} from "../../../model/app/QuoteBlock";
import {clearStateAction} from "../../../store/globalReducers";
import {HttpModel} from "../../../model/http/HttpModel";
import {PageRepository} from "../../../repository/PageRepository";
import {_reorderByPosition} from "./_reorderByPosition";
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

  maxPosition: number = 0;

  droppedSubject = new Subject();

  sourceContext: AppContext;

  // only used for the publish indicator
  title: string = '';

  @ViewChild('workAreaRef', {static: true}) workAreaRef: ElementRef;

  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker,
    private appContextInitializer: AppContextInitializer,
    private pageRepository: PageRepository,
  ) {}

  ngOnInit(): void {
    const h = document.body.offsetHeight;
    this.workAreaRef.nativeElement.setAttribute('style', `min-height: ${h}px`);

    this.componentTracker.componentSubscribe((component) => {
      this.addComponentType(component);
    });

    this.componentTracker.positionSubscribe(({position, positionMap}) => {
      const idx = this.components.findIndex(val => val.position === position);

      this.components.splice(idx, 1);

      _reorderByPosition.call(this, positionMap);
    });

    this.appContextInitializer.whenInit((sourceContext: AppContext) => {
      this.sourceContext = sourceContext;
      this.title = this.sourceContext.knowledgeSource.title;
    });
  }

  ngOnDestroy() {
    this.componentTracker.destroy();
    this.components = [];
    this.store.dispatch(clearStateAction());
  }

  // only used for the publish indicator
  onTitleChanged(title: string): void {
    this.title = title;
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

      case 'quote-block': {
        this.store.dispatch(httpCreateQuoteBlock({position: this.componentTracker.getNextPosition()}));

        break;
      }
    }

    changeState(this.sourceContext, this.store);
  }

  onDropped(component): void {
    this.droppedSubject.next(component.blockUuid);
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousIndex === event.currentIndex) return;

    const previous: any = this.components[event.previousIndex];

    const pageUuid: string = this.sourceContext.page.uuid;
    const blockUuid: string = previous.blockUuid;
    const position: number = event.previousIndex - event.currentIndex;

    const model = HttpModel.updatePosition(pageUuid, blockUuid, position);

    this.pageRepository.updatePosition(model).subscribe((res) => {
      const positionMap = res.positionMap;

      _reorderByPosition.call(this, positionMap);
    });

    changeState(this.sourceContext, this.store);
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }

  onPositionChange($event: {uuid: string, nextPosition: number, currentPosition: number}): void {
    const nextPosition: number = $event.nextPosition;
    const blockUuid: string = $event.uuid;

    const currentIdx: number = this.components.findIndex(c => c.blockUuid === blockUuid);
    const nextIdx: number = this.components.findIndex(c => c.position === nextPosition);

    const previous: any = this.components[currentIdx];

    const pageUuid: string = this.sourceContext.page.uuid;
    const modelBlockUuid: string = previous.blockUuid;
    const position: number = currentIdx - nextIdx;

    const model = HttpModel.updatePosition(pageUuid, modelBlockUuid, position);

    this.pageRepository.updatePosition(model).subscribe((res) => {
      const positionMap = res.positionMap;

      for (const map of positionMap) {
        const idx: number = this.components.findIndex(c => c.blockUuid === map.uuid);

        this.components[idx].position = map.position;
      }
    });

    changeState(this.sourceContext, this.store);
    moveItemInArray(this.components, currentIdx, nextIdx);
  }

  trackByFn(_, item) {
    return item.blockUuid;
  }

  private addComponentType(component) {
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
        component.video,
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
    } else if (ComponentType.isQuoteBlock(component)) {
      this.components.push(new QuoteBlock(
        component.uuid,
        component.shortId,
        component.text,
        component.position,
      ));
    }
  }
}
