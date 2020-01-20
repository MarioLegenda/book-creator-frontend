import {Component, Input} from '@angular/core';
import {RebelCdnRepository} from "../../../../repository/RebelCdnRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";

@Component({
  selector: 'cms-multimedia-block',
  styleUrls: [
    './multimedia-block.component.scss'
  ],
  templateUrl: './multimedia-block.component.html',
})
export class MultimediaBlockComponent {
  @Input('page') page: any;
  @Input('component') component: MultimediaBlockModel;

  componentState = {
    hovered: false,
  };

  constructor(
    private rebelCdnRepository: RebelCdnRepository,
  ) {}

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  fileChange($event) {
    const file = $event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // @ts-ignore
      this.rebelCdnRepository.uploadFile(HttpModel.uploadFile(
        this.page.uuid,
        this.component.blockUuid,
        {
          size: file.size,
          mimeType: file.type,
        },
        fileReader.result,
      )).subscribe(() => {

      })
    };


    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
}
