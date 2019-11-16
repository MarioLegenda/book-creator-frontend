import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {MenuComponent} from "../menu/menu.component";
import {MenuButtonComponent} from "../menu/menu-button.component";
import {BootstrapComponent} from "../bootstrap.component";
import {WorkAreaComponent} from "../work-area.component";
import {TextBlockComponent} from "../blocks/textBlock/text-block.component";
import {CmsRoutingModule} from "./cms-routing.module";

import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    TextBlockComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,

    CommonModule,
    AngularFontAwesomeModule,
    CKEditorModule,
    ReactiveFormsModule,

    CmsRoutingModule,
    FormsModule,
  ],
  providers: [
    {provide: ComponentTracker, useClass: ComponentTracker}
  ],
})
export class CmsModule { }
