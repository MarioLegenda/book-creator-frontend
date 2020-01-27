import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NewCodeProjectDialogComponent} from "./newCodeProject/new-code-project.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    NewCodeProjectDialogComponent,
  ],
  exports: [
    NewCodeProjectDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  entryComponents: [
    NewCodeProjectDialogComponent,
  ]
})
export class NewCodeProjectModule { }
