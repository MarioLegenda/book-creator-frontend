import {Component} from '@angular/core';
import {AccountProvider} from "../../../logic/AccountProvider";
import {FileUploadRepository} from "../../../repository/FileUploadRepository";
import {catchError, last, reduce} from "rxjs/operators";
import {Account} from "../../../model/app/Account";
import {Store} from "@ngrx/store";
import {avatarChanged, basicInfoChanged} from "../../../store/account/actions";
import {HttpModel} from "../../../model/http/HttpModel";
import {AccountRepository} from "../../../repository/AccountRepository";

@Component({
  selector: 'cms-publish-blog',
  styleUrls: [
    '../../shared/styles/generic.component.scss',
    './publish.component.scss',
  ],
  templateUrl: './publish.component.html',
})
export class PublishComponent {
  constructor(
  ) {}
}
