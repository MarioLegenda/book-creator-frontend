import {Component, Input, OnInit} from '@angular/core';
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";
import {PageRepository} from "../../../../repository/PageRepository";
import {environment} from "../../../../../environments/environment";
import {AddYoutubeLinkDialogComponent} from "../../modals/embedYoutubeLink/embed-youtube-link.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {httpRemoveBlock} from "../../../../store/page/httpActions";
import {Store} from "@ngrx/store";
import {EmbedUnsplashDialogComponent} from "../../modals/embedUnsplashImage/embed-unsplash-modal.component";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";

@Component({
  selector: 'cms-multimedia-block',
  styleUrls: [
    './multimedia-block.component.scss'
  ],
  templateUrl: './multimedia-block.component.html',
})
export class MultimediaBlockComponent implements OnInit {
  @Input('appContext') appContext: AppContext;
  @Input('component') component: MultimediaBlockModel;

  componentState = {
    hovered: false,
    fileInfo: null,
    filePath: null,
    video: null,
    unsplash: null,
    contentUploaded: false,
  };

  constructor(
    private rebelCdnRepository: FileUploadRepository,
    private pageRepository: PageRepository,
    private dialog: MatDialog,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    if (this.component.fileInfo) {
      this.componentState.filePath = `http://${environment.rebelCdnApiUri}/images/${this.component.fileInfo.fileName}`;

      this.componentState.contentUploaded = true;
    } else if (this.component.unsplash) {
      this.componentState.unsplash = this.component.unsplash;

      this.componentState.contentUploaded = true;
    }
  }

  remove() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) {
        this.store.dispatch(httpRemoveBlock(this.component));
      }
    });
  }

  embedUnsplashLink() {
    const dialogRef = this.dialog.open(EmbedUnsplashDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((id: string) => {
      if (!id) return;

      const pageUuid = this.appContext.page.uuid;

      const model = HttpModel.updateMultimediaBlock(
        pageUuid,
        this.component.blockUuid,
        null,
        null,
        `https://source.unsplash.com/${id}/1600x900`,
        this.component.position,
      );

      this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
        this.componentState.unsplash = res.unsplash;
        this.componentState.contentUploaded = true;
        this.componentState.filePath = null;
        this.componentState.fileInfo = null;
      });
    });
  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  addYoutubeLink() {
    const dialogRef = this.dialog.open(AddYoutubeLinkDialogComponent, {
      width: '480px',
      data: {},
    });

    const pageUuid = this.appContext.page.uuid;

    dialogRef.afterClosed().subscribe((youtubeId: string) => {
      const model = HttpModel.updateMultimediaBlock(
        pageUuid,
        this.component.blockUuid,
        null,
        `https://youtube.com/embed/${youtubeId}`,
        null,
        this.component.position,
      );

      this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
        this.componentState.video = res.video;
        this.componentState.contentUploaded = true;
      });
    });
  }

  onRemoveMultimedia() {
    const pageUuid = this.appContext.page.uuid;

    const model = HttpModel.updateMultimediaBlock(
      pageUuid,
      this.component.blockUuid,
      null,
      null,
      null,
      this.component.position,
    );

    this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
      this.componentState.contentUploaded = false;

      this.componentState.unsplash = null;
      this.componentState.filePath = null;
      this.componentState.fileInfo = null;
      this.componentState.video = null;
    });
  }

  fileChange($event) {
    const file = $event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const pageUuid = this.appContext.page.uuid;
      // @ts-ignore
      this.rebelCdnRepository.uploadFile(HttpModel.uploadFile(
        pageUuid,
        this.component.blockUuid,
        {
          size: file.size,
          mimeType: file.type,
        },
        fileReader.result,
      )).subscribe((res: any) => {
        const pageUuid = this.appContext.page.uuid;

        const model = HttpModel.updateMultimediaBlock(
          pageUuid,
          this.component.blockUuid,
          {
            fileName: res.fileName,
            dir: res.dir,
            width: res.width,
            height: res.height,
          },
          null,
          null,
          this.component.position,
        );

        this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
          this.componentState.filePath = `http://11.11.11.12/images/${res.fileInfo.fileName}`;
          this.componentState.contentUploaded = true;
          this.componentState.fileInfo = res.fileInfo;
          this.componentState.unsplash = null;
        });
      });
    };


    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
}
