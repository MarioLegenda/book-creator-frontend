import {Component, Input, OnInit} from '@angular/core';
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";
import {PageRepository} from "../../../../repository/PageRepository";
import {AddYoutubeLinkDialogComponent} from "../../modals/embedYoutubeLink/embed-youtube-link.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {httpRemoveBlock} from "../../../../store/page/httpActions";
import {Store} from "@ngrx/store";
import {EmbedUnsplashDialogComponent} from "../../modals/embedUnsplashImage/embed-unsplash-modal.component";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {catchError, reduce} from "rxjs/operators";

@Component({
  selector: 'cms-multimedia-block',
  styleUrls: [
    '../../../shared/styles/generic.component.scss',
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
    video: null,
    unsplash: null,
    uploadError: null,
    imageTooBig: false,
    imageReadFailed: false,
    contentUploaded: false,
  };

  constructor(
    private rebelCdnRepository: FileUploadRepository,
    private pageRepository: PageRepository,
    private dialog: MatDialog,
    private store: Store<any>,
    private fileUploadRepository: FileUploadRepository,
  ) {}

  ngOnInit() {
    console.log(this.component);
    this.loadInitialData();
  }

  remove() {
    this.initRemoveFlow();
  }

  embedUnsplashLink() {
    const dialogRef = this.dialog.open(EmbedUnsplashDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data: {original: string, id: string}) => {
      if (!data) return;

      if (this.componentState.fileInfo) {
        const model = this.createDeleteBlockImageModel();

        this.fileUploadRepository.deleteMultimediaBlockImage(model)
          .pipe(
            reduce((acc, res: any) => {
              return res.data;
            }, {}),
            // @ts-ignore
            catchError((e: any) => {
              if (Object.keys(e.error).length === 0) {
                this.componentState.uploadError = 11;
              } else {
                this.componentState.uploadError = e.error.errorCode;
              }
            })
          ).subscribe(() => {
            this.embedUnsplashFlow(data);
        });
      } else {
        this.embedUnsplashFlow(data);
      }
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

    dialogRef.afterClosed().subscribe((youtubeId: string) => {
    });
  }

  onRemoveMultimedia() {
    this.initRemoveMultimediaFlow();
  }

  fileChange(files: FileList) {
    this.initFileChangeFlow(files);
  }

  private loadInitialData() {
    if (this.component.fileInfo) {
      this.componentState.fileInfo = this.component.fileInfo;
      this.componentState.contentUploaded = true;
    } else if (this.component.unsplash) {
      this.componentState.unsplash = this.component.unsplash;

      this.componentState.contentUploaded = true;
    }
  }

  private createUploadFileModel(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('pageData', JSON.stringify({
      fileInfo: this.componentState.fileInfo,
      pageUuid: this.appContext.page.uuid,
      blockUuid: this.component.blockUuid,
    }));

    return {
      formData: formData,
    };
  }

  private initRemoveFlow() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) {
        this.initRemoveMultimediaFlow(true);
      }
    });
  }

  private initFileChangeFlow(files: FileList) {
    this.resetErrors();

    const reader = new FileReader();

    const file: File = files[0];
    reader.readAsDataURL(files[0]);

    reader.onload = (evn: any) => {
      const model = this.createUploadFileModel(file);

      this.fileUploadRepository.uploadMultimediaBlockImage(model).pipe(
        // @ts-ignore
        catchError((e: any) => {
          if (Object.keys(e.error).length === 0) {
            this.componentState.uploadError = 11;
          } else {
            this.componentState.uploadError = e.error.errorCode;
          }

          if (e.status === 413) {
            this.componentState.imageTooBig = true;
          }
        })
      ).subscribe((res) => {
        this.componentState.fileInfo = res;

        const model = HttpModel.updateMultimediaBlock(
          this.appContext.page.uuid,
          this.component.blockUuid,
          this.componentState.fileInfo,
          null,
          null,
        );

        this.pageRepository.updateMultimediaBlock(model).subscribe(() => {
          this.componentState.contentUploaded = true;
        });
      });
    }
  }

  private initRemoveMultimediaFlow(isBlockRemoved: boolean = false) {
    this.resetErrors();

    const pageUuid = this.appContext.page.uuid;
    const updateModel = HttpModel.updateMultimediaBlock(
      pageUuid,
      this.component.blockUuid,
      null,
      null,
      null,
    );

    if (this.componentState.fileInfo) {
      const model = this.createDeleteBlockImageModel();

      this.fileUploadRepository.deleteMultimediaBlockImage(model)
        .pipe(
          reduce((acc, res: any) => {
            return res.data;
          }, {}),
          // @ts-ignore
          catchError((e: any) => {
            if (Object.keys(e.error).length === 0) {
              this.componentState.uploadError = 11;
            } else {
              this.componentState.uploadError = e.error.errorCode;
            }
          })
        ).subscribe(() => {
        this.pageRepository.updateMultimediaBlock(updateModel).subscribe(() => {
          this.componentState.contentUploaded = false;

          this.componentState.unsplash = null;
          this.componentState.fileInfo = null;
          this.componentState.video = null;

          if (isBlockRemoved) this.store.dispatch(httpRemoveBlock(this.component));
        });
      });
    } else {
      this.pageRepository.updateMultimediaBlock(updateModel).subscribe(() => {
        this.componentState.contentUploaded = false;

        this.componentState.unsplash = null;
        this.componentState.fileInfo = null;
        this.componentState.video = null;

        if (isBlockRemoved) this.store.dispatch(httpRemoveBlock(this.component));
      });
    }
  }

  private createDeleteBlockImageModel() {
    const formData = new FormData();
    formData.append('fileInfo', JSON.stringify(this.componentState.fileInfo));

    return {
      formData: formData,
    };
  }

  private resetErrors() {
    this.componentState.imageReadFailed = false;
    this.componentState.uploadError = false;
    this.componentState.imageTooBig = false;
  }

  private embedUnsplashFlow(data: {original: string, id: string}) {
    const pageUuid = this.appContext.page.uuid;

    const model = HttpModel.updateMultimediaBlock(
      pageUuid,
      this.component.blockUuid,
      null,
      null,
      {
        original: data.original,
        id: data.id,
        real: `https://source.unsplash.com/${data.id}/1600x900`
      }
    );

    this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
      this.componentState.unsplash = res.unsplash;
      this.componentState.contentUploaded = true;
      this.componentState.fileInfo = null;
    });
  }
}
