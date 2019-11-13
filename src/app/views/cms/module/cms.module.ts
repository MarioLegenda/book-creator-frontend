import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {MenuComponent} from "../menu/menu.component";
import {MenuButtonComponent} from "../menu/menu-button.component";
import {MainComponent} from "../main.component";
import {WorkAreaComponent} from "../work-area.component";
import {TextBlockComponent as ViewTextBlockComponent} from "../blocks/textBlock/view/text-block.component";
import {TextBlockComponent as CreateTextBlockComponent} from "../blocks/textBlock/create/text-block.component";
import {SelectionAreaComponent} from "../selection-area.component";
import {BlockSelectorComponent} from "../blocks/block-selector.component";
import {CmsRoutingModule} from "./cms-routing.module";

import {ComponentTracker} from "../../../logic/pageComponent/ComponentTracker";
import {CommonModule} from "@angular/common";
import {MultimediaButtonComponent} from "../menu/multimedia-button.component";

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    CreateTextBlockComponent,
    MultimediaButtonComponent,
    ViewTextBlockComponent,
    SelectionAreaComponent,
    BlockSelectorComponent,
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
  ],
  providers: [
    {provide: ComponentTracker, useClass: ComponentTracker}
  ],
})
export class CmsModule { }
