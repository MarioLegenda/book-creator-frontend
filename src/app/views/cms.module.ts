import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {BrowserModule} from "@angular/platform-browser";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

import {MenuComponent} from "./cms/menu.component";
import {MenuButtonComponent} from "./cms/menu-button.component";
import {MainComponent} from "./cms/main.component";
import {WorkAreaComponent} from "./cms/work-area.component";
import {TextBlockComponent as ViewTextBlockComponent} from "./cms/blocks/textBlock/view/text-block.component";
import {TextBlockComponent as CreateTextBlockComponent} from "./cms/blocks/textBlock/create/text-block.component";
import {TextBlockComponent as UpdateTextBlockComponent} from "./cms/blocks/textBlock/update/text-block.component";
import {SelectionAreaComponent} from "./cms/selection-area.component";
import {BlockSelectorComponent} from "./cms/blocks/block-selector.component";

import {ComponentTracker} from "../logic/pageComponent/ComponentTracker";

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    CreateTextBlockComponent,
    ViewTextBlockComponent,
    SelectionAreaComponent,
    BlockSelectorComponent,
    UpdateTextBlockComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    AngularFontAwesomeModule,
    BrowserModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: ComponentTracker, useClass: ComponentTracker}
  ],
  bootstrap: [MainComponent],
  exports: [
    MainComponent,
  ]
})
export class CmsModule { }
